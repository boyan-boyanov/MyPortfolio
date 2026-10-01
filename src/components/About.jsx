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

const journey = [
  { step: '01', title: '3D Design', detail: 'Furniture, interiors & visualization' },
  { step: '02', title: 'Team Leadership', detail: 'Projects from concept to delivery' },
  { step: '03', title: 'Software Engineering', detail: 'Frontend & interactive 3D' },
  { step: '04', title: 'Mentoring & Education', detail: 'Supporting aspiring engineers' },
]

// Length of the horizontal timeline (desktop/tablet). Any CSS width works:
// '100%' = full section width (same as the cards row), or e.g. '1000px', '80%'
const TIMELINE_MAX_WIDTH = '95%'

// How far the purple story bar extends below its last paragraph (into the gap before the next one).
// '0px' = ends exactly at the text; positive values make it longer, negative values shorter
const STORY_BAR_EXTEND = '35px'

// Understated milestone strip: vertical on mobile, horizontal from sm up
const JourneyTimeline = () => (
  <motion.ol
    variants={fadeIn('', '', 0.6, 1)}
    aria-label='Career journey'
    style={{ maxWidth: TIMELINE_MAX_WIDTH }}
    className='relative mt-16 sm:mt-20 grid gap-8 sm:grid-cols-4 sm:gap-8'
  >
    {/* Connector line */}
    <span
      aria-hidden='true'
      className='absolute left-[4px] top-2 bottom-2 w-px sm:left-0 sm:right-0 sm:top-[4px] sm:bottom-auto sm:w-auto sm:h-px bg-white/10'
    />
    {journey.map(({ step, title, detail }) => (
      <li key={step} className='relative pl-8 sm:pl-0 sm:pt-7'>
        <span
          aria-hidden='true'
          className='absolute left-0 top-[6px] sm:top-0 w-[9px] h-[9px] rounded-full bg-primary border border-[#915eff]'
        />
        <p className='text-[12px] font-medium tracking-[0.2em] text-[#9e9ab5]'>{step}</p>
        <p className='mt-1.5 text-[#f5f5f7] text-[15px] sm:text-[16px] font-semibold'>{title}</p>
        <p className='mt-1 text-[#b9b6cb] text-[14px] leading-[1.6]'>{detail}</p>
      </li>
    ))}
  </motion.ol>
)

const About = () => {
  return (
    <>
    {/* Pulls the section up toward the hero: -410px on mobile, -210px from 640px (sm) up */}
    <motion.div variants={textVariant()}>
      <p className={`${styles.sectionSubText} flex items-center gap-3`}>
        <span aria-hidden='true' className='h-px w-8 bg-[#915eff]' />
        FROM DESIGN TO CODE
      </p>
      <h2 className={`${styles.sectionHeadText} text-[#f5f5f7]! mt-2`}>My Journey.</h2>
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
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='text-[#e4e2ee] text-[18px] sm:text-[20px] font-medium leading-[1.6]'
        >
          My path to software engineering was anything but traditional.
        </motion.p>
        <motion.p variants={fadeIn('', '', 0.2, 1)}>
          Before becoming a software engineer, I spent <Highlight>nearly two decades</Highlight> in{' '}
          3D design, project coordination, logistics, and team leadership. I designed
          furniture and living spaces, created 3D visualizations, and led teams responsible for delivering
          projects from concept to completion.
        </motion.p>
        <motion.p variants={fadeIn('', '', 0.3, 1)}>
          Technology remained a constant passion throughout my career, ultimately leading me to earn a{' '}
          <Highlight>Master's degree in Software Engineering</Highlight> and transition into professional
          software development.
        </motion.p>
        <motion.p variants={fadeIn('', '', 0.4, 1)}>
          Today, I work primarily as a <Highlight accent>Frontend Engineer</Highlight>, building modern web
          applications and interactive 3D experiences with <Highlight accent>Three.js</Highlight> while
          continuing to grow toward <Highlight>full-stack development</Highlight>.
        </motion.p>
      </div>

      <div className='pl-6 sm:pl-12 lg:pl-20 space-y-6 sm:space-y-7'>
        <motion.p variants={fadeIn('', '', 0.5, 1)}>
          Beyond software development, I actively contribute to <Highlight>mentoring</Highlight>,{' '}
          technical education, and community initiatives, helping aspiring engineers
          develop both technical skills and confidence.
        </motion.p>
      </div>
    </div>

    <JourneyTimeline />

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