import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { motion } from 'framer-motion'
import 'react-vertical-timeline-component/style.min.css'

import { styles } from '../styles'
import { experiences, contributions } from '../constants'
import { textVariant } from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper'

const CARD_BG = '#1d1836'
// Icon size inside the timeline circle; an entry can override it with `iconSize` (e.g. "100%" to fill the circle)
const DEFAULT_ICON_SIZE = '60%'

// "MM/YYYY" -> sortable number of months. Invalid or missing dates go to the end of the timeline
const toMonths = (value) => {
  const match = /^(\d{1,2})\/(\d{4})$/.exec(value?.trim() ?? '')
  if (!match) {
    console.warn(`Timeline: invalid showOnTimeline "${value}", expected MM/YYYY`)
    return Number.POSITIVE_INFINITY
  }
  return Number(match[2]) * 12 + Number(match[1]) - 1
}

// Work on the left, contributions on the right, all ordered by showOnTimeline (oldest first).
// On equal dates work comes first, because sort() keeps the original order
const timelineItems = [
  ...experiences.map((item) => ({ ...item, type: 'work', side: 'left' })),
  ...contributions.map((item) => ({ ...item, type: 'contribution', side: 'right' })),
].sort((a, b) => toMonths(a.showOnTimeline) - toMonths(b.showOnTimeline))

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      position={experience.side}
      contentStyle={{ background: CARD_BG, color: '#fff' }}
      // The library always draws the arrow with border-right (rotated for left-side cards)
      contentArrowStyle={{ borderRight: `7px solid ${CARD_BG}` }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        // overflow-hidden clips the image to the circle (iconSize can go above 100% to zoom in)
        <div className='flex justify-center items-center w-full h-full rounded-full overflow-hidden'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            style={{ width: experience.iconSize ?? DEFAULT_ICON_SIZE, height: experience.iconSize ?? DEFAULT_ICON_SIZE }}
            // max-w-none + shrink-0 allow sizes above 100%; the wrapper clips everything outside the circle
            className='object-contain max-w-none shrink-0'
          />
        </div>
      }
    >
      <div>
        {/* Label from the entry's `label` field; hidden when the entry has none.
            `!` = important: the timeline library styles every <p> in a card (.vertical-timeline-element-content p) */}
        {experience.label && (
          <p className='text-[13px]! uppercase tracking-[0.2em] text-[#a983ff]' style={{ margin: 0 }}>
            {experience.label}
          </p>
        )}
        <h3 className='mt-1 text-white text-[24px] font-bold'>{experience.title}</h3>
        <p className='text-secondary text-[16px]! font-semibold!' style={{ margin: 0 }}>
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-none space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] tracking-wider'
          >
            {point}
          </li>
        ))}
      </ul>

      {/* TODO: "Show more" behavior is not defined yet */}
      <button
        type='button'
        className='mt-6 px-4 py-2 rounded-lg border border-[#915eff]/60 text-[14px] font-medium text-white hover:bg-[#915eff]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] transition-colors'
      >
        Show more
      </button>
    </VerticalTimelineElement>
  )
}

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {timelineItems.map((experience) => (
            <ExperienceCard
              key={`${experience.type}-${experience.company_name}-${experience.date}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

const ExperienceSection = SectionWrapper(Experience, 'work')

export default ExperienceSection
