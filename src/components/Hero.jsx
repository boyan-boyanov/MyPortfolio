import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { ComputersCanvas } from './canvas'
import './customStyles/Hero.css'



const Hero = () => {
  const [isMobile, setIsMobile] = useState(false)    
    
    useEffect(()=>{
      //Add a listener for changes to the screen size
      const mediaQuert = window.matchMedia('(max-width: 640px)')
  
      //set the initial value of the "isMobile" state variable
      setIsMobile(mediaQuert.matches)
  
      //Define a callback function to handle changes to the media query
      const handleMediaQueryChange = (event) => {
        setIsMobile(event.matches)
      }
  
      //Add the callback function as a listene for changes to the media query
      mediaQuert.addEventListener('change', handleMediaQueryChange);
  
      //remove the listener when the component is unmounted
      return () => {
        mediaQuert.removeEventListener('change', handleMediaQueryChange)
      }
    },[])
  return (
    <section className='hero-section'>
      <div className='hero-inner'>
        <div className="hero-col">
          <div className="dot" />
          <div className="vertical-line violet-gradient" />
        </div>

        <div>
          <h1 className='hero-title'>Hi, I'm <span className='text-purple'>Boyan</span></h1>
          <p className='hero-sub-text'>I develop 3D visuals, user <br className='responsive-break' /> interfaces and web applications.</p>
        </div>
      </div>

      <ComputersCanvas isMobile={isMobile}></ComputersCanvas>
     
     <div className='motion-scroller-container'>
      <a href="#about">
        <div className='motion-scroller'>
          <motion.dev 
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
    </section>
  )
}

export default Hero