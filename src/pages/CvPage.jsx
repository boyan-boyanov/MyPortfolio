import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalWorkerOptions, TextLayer, getDocument } from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

import '../components/customStyles/CvPage.css'
import { cvFile } from '../constants'
import { cvPdfUrl } from '../utils/cv'
import { DownloadIcon } from '../components/SocialIcons'

// Vite bundles the worker as a separate file and gives its URL
GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const PAGE_TITLE = 'Boyan Boyanov – CV'
// Pages are re-rendered this long after the last resize
const RESIZE_DEBOUNCE_MS = 150
// Shape of the placeholder before a page is measured (A4)
const A4_RATIO = 210 / 297

// Renders one PDF page to a canvas (sharp on high-DPI screens) with a selectable text layer on top
const PdfPage = ({ pdf, pageNumber, width }) => {
  const canvasRef = useRef(null)
  const textLayerRef = useRef(null)
  const [aspectRatio, setAspectRatio] = useState(A4_RATIO)

  useEffect(() => {
    let cancelled = false
    let renderTask = null
    let textLayer = null

    const render = async () => {
      const page = await pdf.getPage(pageNumber)
      if (cancelled) return

      const baseViewport = page.getViewport({ scale: 1 })
      const scale = width / baseViewport.width
      const viewport = page.getViewport({ scale })
      setAspectRatio(baseViewport.width / baseViewport.height)

      // The canvas has devicePixelRatio times more pixels than its CSS size, so text stays sharp
      const outputScale = window.devicePixelRatio || 1
      const canvas = canvasRef.current
      canvas.width = Math.floor(viewport.width * outputScale)
      canvas.height = Math.floor(viewport.height * outputScale)

      renderTask = page.render({
        canvas,
        canvasContext: canvas.getContext('2d'),
        viewport,
        transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null,
      })
      await renderTask.promise
      if (cancelled) return

      const container = textLayerRef.current
      container.replaceChildren()
      container.style.setProperty('--total-scale-factor', String(scale))
      textLayer = new TextLayer({ textContentSource: page.streamTextContent(), container, viewport })
      await textLayer.render()
    }

    render().catch((error) => {
      // Cancelling a render (resize, leaving the page) is expected
      if (!cancelled && error?.name !== 'RenderingCancelledException') console.error(error)
    })

    return () => {
      cancelled = true
      renderTask?.cancel()
      textLayer?.cancel()
    }
  }, [pdf, pageNumber, width])

  return (
    <div className='cv-page relative mx-auto bg-white shadow-card' style={{ width, aspectRatio }}>
      <canvas ref={canvasRef} className='block w-full h-full' aria-label={`CV page ${pageNumber}`} />
      <div ref={textLayerRef} className='textLayer' />
    </div>
  )
}

const DownloadLink = ({ className = '' }) => (
  <a
    href={cvPdfUrl}
    download={cvFile.downloadName}
    className={`inline-flex items-center gap-2 shrink-0 rounded-lg bg-[#915eff] px-3 sm:px-4 py-2 text-[14px] sm:text-[15px] font-semibold text-white transition-colors hover:bg-[#7c4dff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${className}`}
  >
    <DownloadIcon className='w-[18px] h-[18px]' />
    Download PDF
  </a>
)

const CvPage = () => {
  const [pdf, setPdf] = useState(null)
  const [error, setError] = useState(false)
  // Width available for the pages, in CSS pixels (0 until measured)
  const [width, setWidth] = useState(0)
  const pagesRef = useRef(null)

  useEffect(() => {
    const previousTitle = document.title
    document.title = PAGE_TITLE
    return () => {
      document.title = previousTitle
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    const loadingTask = getDocument({ url: cvPdfUrl })
    loadingTask.promise.then(setPdf).catch((loadError) => {
      // destroy() below rejects the promise ("Loading aborted"); that is not a failure
      if (cancelled) return
      console.error(loadError)
      setError(true)
    })
    return () => {
      cancelled = true
      loadingTask.destroy()
    }
  }, [])

  // Measures right away, then again (debounced) whenever the column changes width
  useEffect(() => {
    const element = pagesRef.current
    setWidth(Math.floor(element.clientWidth))

    let timer = null
    const observer = new ResizeObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(() => setWidth(Math.floor(element.clientWidth)), RESIZE_DEBOUNCE_MS)
    })
    observer.observe(element)
    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div className='min-h-screen bg-primary text-white'>
      <header className='sticky top-0 z-10 border-b border-white/10 bg-primary/90 backdrop-blur'>
        <div className='mx-auto flex max-w-[900px] items-center justify-between gap-4 px-4 py-3'>
          <div className='min-w-0'>
            <p className='truncate text-[15px] sm:text-[18px] font-bold'>Boyan Boyanov · CV</p>
            <Link
              to='/'
              className='rounded text-[14px] text-secondary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff]'
            >
              ← Portfolio
            </Link>
          </div>
          <DownloadLink />
        </div>
      </header>

      <main className='mx-auto max-w-[900px] px-4 py-6 sm:py-10'>
        <div ref={pagesRef} className='w-full'>
          {error ? (
            <div role='alert' className='flex flex-col items-start gap-4 rounded-2xl bg-black-100 p-6'>
              <p className='text-[16px]'>The CV could not be displayed.</p>
              <DownloadLink />
            </div>
          ) : !pdf || !width ? (
            <div
              role='status'
              aria-label='Loading the CV'
              className='mx-auto w-full animate-pulse rounded-sm bg-tertiary'
              style={{ aspectRatio: A4_RATIO }}
            />
          ) : (
            <div className='flex flex-col gap-6'>
              {Array.from({ length: pdf.numPages }, (_, index) => (
                <PdfPage key={index + 1} pdf={pdf} pageNumber={index + 1} width={width} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default CvPage
