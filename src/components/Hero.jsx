import React, { useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { ComputersCanvas } from './canvas'
import './customStyles/Hero.css'
import { socialLinks, externalLinkProps } from '../constants'
import { DocumentIcon, GitHubIcon, LinkedInIcon } from './SocialIcons'
import { cvPageUrl } from '../utils/cv'

const heroLinks = [
  { href: socialLinks.linkedin, label: 'LinkedIn profile', Icon: LinkedInIcon },
  { href: socialLinks.github, label: 'GitHub profile', Icon: GitHubIcon },
  { href: cvPageUrl, label: 'Open CV in a new tab', Icon: DocumentIcon },
]

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
          <p className='hero-sub-text'><span className='hero-sub-text-key'>Frontend Engineer</span> building web applications
            <br className='responsive-break' /> with <span className='hero-sub-text-key'>React</span> and <span className='hero-sub-text-key'>TypeScript</span>.
            <br className='responsive-break' /> <span className='hero-sub-text-second'>Background in 3D design and leadership.</span>
          </p>

          {/* Part of the text column, so the 3D stage below shrinks around it instead of overlapping */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className='hero-social'
          >
            {heroLinks.map((link) => (
              <a key={link.label} href={link.href} aria-label={link.label} {...externalLinkProps} className='hero-social-link'>
                <link.Icon />
              </a>
            ))}
          </motion.div>
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
