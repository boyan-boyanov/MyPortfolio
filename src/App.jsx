import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// Both pages are loaded on demand: /cv does not download the Three.js scenes,
// and the home page does not download the PDF renderer
const HomePage = lazy(() => import('./pages/HomePage'))
const CvPage = lazy(() => import('./pages/CvPage'))

const App = () => {

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={<div className='min-h-screen bg-primary' />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cv' element={<CvPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
