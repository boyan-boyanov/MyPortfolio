import React, { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { pauseScenes } from '../utils/scenePause'

// Icon size inside a timeline circle; an entry can override it with `iconSize`
// (e.g. "100%" to fill the circle, above 100% to zoom in; everything outside is clipped)
export const DEFAULT_ICON_SIZE = '60%'

// The entry's icon clipped to a circle. Fills its parent, which sets the size and background
export const TimelineIcon = ({ item }) => {
  const size = item.iconSize ?? DEFAULT_ICON_SIZE

  return (
    <div className='flex justify-center items-center w-full h-full rounded-full overflow-hidden'>
      <img
        src={item.icon}
        alt=''
        style={{ width: size, height: size }}
        // max-w-none + shrink-0 allow sizes above 100%; the wrapper clips everything outside the circle
        className='object-contain max-w-none shrink-0'
      />
    </div>
  )
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Sections fade up one after another once the modal has scaled in
const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + index * 0.07, duration: 0.35, ease: 'easeOut' },
  }),
}

const Section = ({ title, index, children }) => (
  <motion.section variants={sectionVariants} custom={index} initial='hidden' animate='show'>
    <h3 className='flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#a983ff]'>
      <span aria-hidden='true' className='h-px w-6 shrink-0 bg-[#915eff]' />
      {title}
    </h3>
    <div className='mt-4'>{children}</div>
  </motion.section>
)

const BulletList = ({ items }) => (
  <ul className='space-y-3'>
    {items.map((item, index) => (
      <li key={index} className='flex gap-3 text-[15px] leading-[1.7] text-[#c8c5d8]'>
        <span aria-hidden='true' className='mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#915eff]' />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

// Two chip styles: "tech" = squared tags like a tech stack, "accent" = soft purple pills
const CHIP_STYLES = {
  tech: 'rounded-md border border-white/12 bg-white/[0.04] text-[#e4e2ee]',
  accent: 'rounded-full border border-[#915eff]/35 bg-[#915eff]/10 text-[#e4e2ee]',
}

const ChipList = ({ items, variant = 'tech' }) => (
  <ul className='flex flex-wrap gap-2'>
    {items.map((item) => (
      <li key={item} className={`px-3 py-1.5 text-[13px] font-medium ${CHIP_STYLES[variant]}`}>
        {item}
      </li>
    ))}
  </ul>
)

const Paragraph = ({ children }) => (
  <p className='text-[15px] sm:text-[16px] leading-[1.75] text-[#c8c5d8]'>{children}</p>
)

const ModalContent = ({ item, onClose }) => {
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = useId()

  const details = item.details ?? {}
  // Entries without `details` still get a useful modal: their card points become "What I did"
  const whatIDid = details.whatIDid ?? item.points ?? []
  const bring = details.bringToSoftware ?? {}
  // Story order: Overview -> What I did -> Skills developed -> What I bring into software engineering
  const sections = [
    details.overview && { title: 'Overview', body: <Paragraph>{details.overview}</Paragraph> },
    whatIDid.length > 0 && { title: 'What I Did', body: <BulletList items={whatIDid} /> },
    details.skills?.length > 0 && { title: 'Skills Developed', body: <ChipList items={details.skills} variant='tech' /> },
    (bring.text || bring.skills?.length > 0) && {
      title: 'What I Bring Into Software Engineering',
      body: (
        <div className='space-y-4'>
          {bring.text && <Paragraph>{bring.text}</Paragraph>}
          {bring.skills?.length > 0 && <ChipList items={bring.skills} variant='accent' />}
        </div>
      ),
    },
    details.gallery?.length > 0 && {
      title: 'Gallery',
      body: (
        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4'>
          {details.gallery.map((image) => (
            <figure key={image.src} className='overflow-hidden rounded-xl border border-white/10 bg-white/5'>
              <img src={image.src} alt={image.alt ?? ''} loading='lazy' className='aspect-[4/3] w-full object-cover' />
              {image.caption && (
                <figcaption className='px-3 py-2 text-[13px] leading-[1.5] text-[#b9b6cb]'>{image.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      ),
    },
  ].filter(Boolean)

  // While open: pause the 3D backgrounds, lock page scroll, close on Escape, keep Tab inside the dialog,
  // and give focus back to the "Show more" button on close
  useEffect(() => {
    const trigger = document.activeElement
    const resumeScenes = pauseScenes()

    const { overflow, paddingRight } = document.body.style
    // Reserve the scrollbar's width so the page behind does not jump sideways
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`

    closeRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      resumeScenes()
      trigger?.focus?.()
    }
  }, [onClose])

  return (
    <motion.div
      className='fixed inset-0 z-[100] flex items-center justify-center p-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Overlay: dims and softly blurs the page; clicking it closes the modal */}
      <div aria-hidden='true' onClick={onClose} className='absolute inset-0 bg-[#050816]/75 backdrop-blur-[8px]' />

      <motion.div
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className='relative flex w-[90%] max-w-[900px] max-h-[85vh] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0d0b21]/90 backdrop-blur-xl shadow-[0_30px_100px_-20px_rgba(145,94,255,0.35)]'
      >
        {/* Thin purple -> cyan highlight along the top edge */}
        <span
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#915eff]/70 to-[#00cea8]/50'
        />
        {/* Soft corner glows that echo the site's purple and cyan */}
        <span
          aria-hidden='true'
          className='pointer-events-none absolute -top-32 -left-24 h-64 w-64 rounded-full bg-[#915eff]/15 blur-3xl'
        />
        <span
          aria-hidden='true'
          className='pointer-events-none absolute -bottom-32 -right-24 h-64 w-64 rounded-full bg-[#00cea8]/10 blur-3xl'
        />

        <button
          ref={closeRef}
          type='button'
          onClick={onClose}
          aria-label='Close'
          className='absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#c8c5d8] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff]'
        >
          <svg aria-hidden='true' viewBox='0 0 24 24' className='h-5 w-5' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
            <path d='M6 6l12 12M18 6L6 18' />
          </svg>
        </button>

        {/* Scrolls internally when the content is taller than 85vh */}
        <div className='relative overflow-y-auto px-6 py-8 sm:px-10 sm:py-10'>
          <header className='flex flex-col gap-5 pr-10 sm:flex-row sm:items-center'>
            <div
              className='h-16 w-16 shrink-0 rounded-full ring-2 ring-white/15 shadow-[0_0_30px_-6px_rgba(145,94,255,0.6)]'
              style={{ background: item.iconBg }}
            >
              <TimelineIcon item={item} />
            </div>
            <div>
              {item.label && (
                <p className='text-[12px] font-medium uppercase tracking-[0.2em] text-[#a983ff]'>{item.label}</p>
              )}
              <h2 id={titleId} className='mt-1 text-[24px] sm:text-[30px] font-bold leading-tight text-[#f5f5f7]'>
                {item.title}
              </h2>
              <p className='mt-1 text-[15px] sm:text-[16px] font-medium text-[#b9b6cb]'>
                {item.company_name}
                {item.date && (
                  <>
                    <span aria-hidden='true' className='mx-2 text-[#915eff]'>·</span>
                    <span className='whitespace-nowrap'>{item.date}</span>
                  </>
                )}
              </p>
            </div>
          </header>

          <div aria-hidden='true' className='mt-8 h-px bg-white/10' />

          <div className='mt-8 space-y-10'>
            {sections.map((section, index) => (
              <Section key={section.title} title={section.title} index={index}>
                {section.body}
              </Section>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Rendered into <body> so no section's stacking or transforms can clip it.
// Pass the timeline entry to open it, null to close (AnimatePresence plays the exit animation)
const TimelineModal = ({ item, onClose }) =>
  createPortal(
    <AnimatePresence>{item && <ModalContent key={item.title} item={item} onClose={onClose} />}</AnimatePresence>,
    document.body
  )

export default TimelineModal
