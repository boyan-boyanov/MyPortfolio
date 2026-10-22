import React, { useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { ComputersCanvas } from './canvas'
import './customStyles/Hero.css'

const Hero = () => {
  const stage = useRef(null)
  // The 3D model reports its height on screen (the scroll hint scales with it) and the
  // height it needs, so the stage never leaves empty space above it (see Hero.css)
  const handleModelResize = useCallback(({ modelHeight, idealHeight }) => {
    stage.current?.style.setProperty('--model-height', modelHeight)
    stage.current?.style.setProperty('--stage-height', idealHeight)
  }, [])

  return (
    <section className='hero-section'>
      <div className='hero-inner'>
        <div className="hero-col">
          <div className="dot" />
          <div className="vertical-line violet-gradient" />
        </div>

        <div>
          <h1 className='hero-title'>Hi, I'm <span className='text-purple'>Boyan</span></h1>
          <p className='hero-sub-text'>Software Engineer with a background in
            <br className='responsive-break' /> 3D design, leadership, and frontend development,
            <br className='responsive-break' /> creating interactive web experiences with modern technologies.
          </p>
        </div>
      </div>

      {/* The model and the scroll hint share this box, so the hint stays on the desk's front edge */}
      <div className='hero-stage' ref={stage}>
        <ComputersCanvas onModelResize={handleModelResize} />

        <div className='motion-scroller-container'>
          <a href="#about">
            <div className='motion-scroller'>
              <motion.div 
              animate={{y: [0,34,0]}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className="motion-dot"
              />          
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
