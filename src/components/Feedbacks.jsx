import React from 'react'
import { motion } from 'framer-motion'

import { styles } from '../styles'
import { testimonials } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper'

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => {
  return (
    <motion.figure
      variants={fadeIn('', 'spring', index * 0.5, 0.75)}
      className='bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full flex flex-col'
    >
      <p className='text-white font-black text-[48px] leading-none' aria-hidden='true'>
        &ldquo;
      </p>

      <blockquote className='mt-1 flex-1'>
        <p className='text-white tracking-wider text-[18px]'>{testimonial}</p>
      </blockquote>

      <figcaption className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-white font-medium text-[16px]'>
            <span className='blue-text-gradient'>@</span> {name}
          </p>
          <p className='mt-1 text-secondary text-[12px]'>
            {designation} of {company}
          </p>
        </div>

        <img
          src={image}
          alt={name}
          loading='lazy'
          className='w-10 h-10 rounded-full object-cover'
        />
      </figcaption>
    </motion.figure>
  )
}

const Feedbacks = () => {
  return (
    <div className='mt-12 bg-black-100 rounded-[20px]'>
      <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>

      {/* Pulls the cards up so they overlap the bottom of the header panel */}
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  )
}

const FeedbacksSection = SectionWrapper(Feedbacks, '')

export default FeedbacksSection
