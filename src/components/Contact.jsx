import React, { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import { styles } from '../styles'
import { EarthCanvas } from './canvas'
import { slideIn } from '../utils/motion'
import SectionWrapper from '../hoc/SectionWrapper'

// Set these in .env.local (see .env.example); the recipient address lives in the EmailJS template
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const EMPTY_FORM = { name: '', email: '', message: '' }

const inputClassName =
  'bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium focus-visible:ring-2 focus-visible:ring-[#915eff]'

const Contact = () => {
  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  // null | { type: 'success' | 'error', text: string }
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setForm(EMPTY_FORM)
      setStatus({ type: 'success', text: 'Thank you. I will get back to you as soon as possible.' })
    } catch (error) {
      console.error(error)
      setStatus({ type: 'error', text: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              autoComplete='name'
              required
              className={inputClassName}
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              autoComplete='email'
              required
              className={inputClassName}
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What do you want to say?'
              required
              className={`${inputClassName} resize-none`}
            />
          </label>

          <div className='flex flex-wrap items-center gap-5'>
            <button
              type='submit'
              disabled={loading}
              className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl cursor-pointer disabled:cursor-wait disabled:opacity-70'
            >
              {loading ? 'Sending...' : 'Send'}
            </button>

            {status && (
              <p
                role='status'
                className={`text-[14px] ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
              >
                {status.text}
              </p>
            )}
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

const ContactSection = SectionWrapper(Contact, 'contact')

export default ContactSection
