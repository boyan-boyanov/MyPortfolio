import React, { useEffect, useRef, useState } from 'react'

import { BallView, BallsCanvas } from './canvas'
import { createResetGroup } from './canvas/resetGroup'
import { technologies } from '../constants'
import SectionWrapper from '../hoc/SectionWrapper'

// How long after the last ball is let go all moved balls return to their starting view
const BALL_RESET_DELAY = 5000

const Tech = () => {
  const containerRef = useRef(null)
  const [inView, setInView] = useState(false)
  // One timer for all balls: rotating any ball postpones the reset of every ball
  const [resetGroup] = useState(() => createResetGroup(BALL_RESET_DELAY))

  useEffect(() => () => resetGroup.dispose(), [resetGroup])

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
        <BallView
          key={technology.name}
          icon={technology.icon}
          className='w-28 h-28'
          resetGroup={resetGroup}
        />
      ))}

      <BallsCanvas eventSource={containerRef} active={inView} />
    </div>
  )
}

const TechSection = SectionWrapper(Tech, '')

export default TechSection
