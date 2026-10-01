import React from 'react'
import Tilt from 'react-parallax-tilt'
import {motion} from 'framer-motion'

import {styles} from '../styles'
import {services} from '../constants'
import {fadeIn, textVariant} from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper'

const ServiceCard = ({icon, title, index}) => {
  return (
      <Tilt
        className='xs:w-[250px] w-full'
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1}
        transitionSpeed={450}
      >
        <motion.div
          variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
          className='w-full green-pink-gradient p-px rounded-[20px] shadow-card'
        >
          <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
            <img src={icon} alt={title} className='w-16 h-16 object-contain' />
            <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
          </div>
        </motion.div>
      </Tilt>
  )
}

const About = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>FROM DESIGN TO CODE</p>
      <h2 className={styles.sectionHeadText}>My Journey.</h2>
    </motion.div>

    <motion.p variants={fadeIn("", "", 0.1, 1)} className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
      My path to software engineering was anything but traditional.
      <br className='responsive-break' />
      <br className='responsive-break' /> Before becoming a software engineer, I spent nearly two decades in 3D design, project coordination, logistics, and team leadership. I designed furniture and living spaces, created 3D visualizations, and led teams responsible for delivering projects from concept to completion.
      <br className='responsive-break' />
      <br className='responsive-break' /> Technology remained a constant passion throughout my career, ultimately leading me to earn a Master's degree in Software Engineering and transition into professional software development.
      <br className='responsive-break' />
      <br className='responsive-break' /> Today, I work primarily as a Frontend Engineer, building modern web applications and interactive 3D experiences with Three.js while continuing to grow toward full-stack development.
      <br className='responsive-break' />
      <br className='responsive-break' /> Beyond software development, I actively contribute to mentoring, technical education, and community initiatives, helping aspiring engineers develop both technical skills and confidence.
    </motion.p>

    <div className='mt-20 flex flex-wrap gap-10'>
      {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
      ))}
    </div>
      </>
  )
}

const AboutSection = SectionWrapper(About, "about")

export default AboutSection