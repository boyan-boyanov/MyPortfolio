import React from 'react'
import { motion } from 'framer-motion'

import { styles } from '../styles'
import { staggerContainer } from '../utils/motion'

// Wraps a section with page padding, a scroll anchor for the navbar links,
// and starts the "hidden" -> "show" variants of its children when it scrolls into view.
// The reveal starts once the top of the section is REVEAL_OFFSET inside the bottom of the screen,
// independent of how tall the section is (a % threshold fires very late for tall sections on phones).
// Larger value = later reveal
const REVEAL_OFFSET = '100px'

const SectionWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0, margin: `0px 0px -${REVEAL_OFFSET} 0px` }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        {/* Offsets the anchor so the fixed navbar does not cover the section title */}
        <span className="hash-span" id={idName || undefined}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    )
  }

export default SectionWrapper
