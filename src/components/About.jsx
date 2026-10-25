import React from 'react'
import Tilt from 'react-parallax-tilt'
import {motion} from 'framer-motion'

import {styles} from '../styles'
import {services} from '../constants'
import {fadeIn, textVariant} from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper'

const ServiceCard = ({icon, title, subtitle, index}) => {
  return (
      <Tilt
        className='w-full h-full'
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1}
        transitionSpeed={450}
      >
        <motion.div
          variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
          className='w-full h-full green-pink-gradient p-px rounded-[20px] shadow-card'
        >
          {/* Top-aligned so icons and titles share the same offsets across cards, regardless of title length */}
          <div className="bg-tertiary rounded-[20px] h-full pt-8 pb-6 px-3 min-h-[190px] sm:pt-12 sm:pb-8 sm:px-4 sm:min-h-[280px] flex justify-start items-center flex-col">
            <img src={icon} alt={title} className='w-14 h-14 sm:w-20 sm:h-20 object-contain shrink-0' />
            <h3 className='mt-5 sm:mt-8 text-white text-[14px] sm:text-[18px] xl:text-[20px] font-bold text-center text-balance'>{title}</h3>
            {/* Secondary line: smaller and muted so the title is read first */}
            <p className='mt-1.5 sm:mt-2 text-[#aaa6c3] text-[12px] sm:text-[14px] xl:text-[15px] font-normal text-center text-balance leading-snug'>{subtitle}</p>
          </div>
        </motion.div>
      </Tilt>
  )
}

// Emphasis by weight only; `accent` is reserved for the core role/stack identifiers.
// The accent text is a lighter tint of the #915eff brand purple so it stays readable (~7:1) on the dark background
const Highlight = ({ children, accent = false }) => (
  <strong className={`font-semibold ${accent ? 'text-[#a983ff]' : 'text-[#f5f5f7]'}`}>
    {children}
  </strong>
)

// How far the purple story bar extends below its last paragraph (into the gap before the next one).
// '0px' = ends exactly at the text; positive values make it longer, negative values shorter
const STORY_BAR_EXTEND = '35px'

const About = () => {
  return (
    <>
    {/* Pulls the section up toward the hero: -410px on mobile, -210px from 640px (sm) up */}
    <motion.div variants={textVariant()}>
      <p className={`${styles.sectionSubText} flex items-center gap-3`}>
        <span aria-hidden='true' className='h-px w-8 bg-[#915eff]' />
        BACKGROUND & PERSPECTIVE
      </p>
      <h2 className={`${styles.sectionHeadText} text-[#f5f5f7]! mt-2`}>About Me.</h2>
    </motion.div>

    {/* Story block. The brand-purple bar spans only the first group (the path into software);
        move paragraphs between the two groups to change where the bar ends */}
    <div className='mt-10 sm:mt-14 space-y-6 sm:space-y-7 text-[#c8c5d8] text-[16px] sm:text-[17px] leading-[1.75] [&_p]:max-w-[800px]'>
      <div className='relative pl-6 sm:pl-12 lg:pl-20 space-y-6 sm:space-y-7'>
        <span
          aria-hidden='true'
          style={{ bottom: `calc(-1 * ${STORY_BAR_EXTEND})` }}
          className='absolute left-0 -top-2.5 w-1 sm:w-1.5 rounded-full bg-[#915eff]'
        />
        <motion.p variants={fadeIn('', '', 0.2, 1)}>
          I’m a <Highlight>Frontend Engineer</Highlight> working primarily with{' '}
          <Highlight>React and TypeScript</Highlight>, with additional experience in Vue and Three.js.{' '}
          I hold a <Highlight>Master's degree</Highlight> in Software Engineering and Scrum.org <Highlight>PSD I and PSM I</Highlight> certifications.
        </motion.p>
        <motion.p variants={fadeIn('', '', 0.3, 1)}>
          Before software engineering, I spent nearly two decades in{' '}
          <Highlight>3D design and leadership</Highlight>, an experience that still shapes how I approach users, complex requirements, collaboration, and ownership.
        </motion.p>
      </div>

      <div className='pl-6 sm:pl-12 lg:pl-20 space-y-6 sm:space-y-7'>
        <motion.p variants={fadeIn('', '', 0.4, 1)}>
          I also volunteered as a developer and mentor in DXC's <Highlight accent>Dandelion Program</Highlight> for neurodivergent IT talent.
        </motion.p>
      </div>
    </div>

    <motion.p
      variants={fadeIn('', '', 0.2, 1)}
      className={`${styles.sectionSubText} mt-20 flex items-center gap-3`}
    >
      <span aria-hidden='true' className='h-px w-8 bg-[#915eff]' />
      AT A GLANCE
    </motion.p>

    {/* auto-rows-fr + h-full chain keeps all four cards the same width and height */}
    <div className='mt-8 grid grid-cols-2 xl:grid-cols-4 auto-rows-fr gap-4 sm:gap-8'>
      {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
      ))}
    </div>
      </>
  )
}

const AboutSection = SectionWrapper(About, "about")

export default AboutSection