import React from 'react'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { ComputersCanvas } from './canvas'
import './customStyles/Hero.css'



const Hero = () => {
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

      <ComputersCanvas></ComputersCanvas>
    </section>
  )
}

export default Hero