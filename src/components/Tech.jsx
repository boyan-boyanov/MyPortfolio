import React, { useEffect, useRef, useState } from 'react'

import { BallView, BallsCanvas } from './canvas'
import { technologies } from '../constants'
import SectionWrapper from '../hoc/SectionWrapper'

const Tech = () => {
  const containerRef = useRef(null)
  const [inView, setInView] = useState(false)

  // Only render the shared canvas while the balls are on (or near) the screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <BallView key={technology.name} icon={technology.icon} className='w-28 h-28' />
      ))}

      <BallsCanvas eventSource={containerRef} active={inView} />
    </div>
  )
}

const TechSection = SectionWrapper(Tech, '')

export default TechSection
