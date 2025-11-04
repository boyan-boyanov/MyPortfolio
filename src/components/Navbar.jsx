import React, { useState } from 'react'
import {Link} from 'react-router-dom'

import {styles} from '../styles'
import {navLinks} from '../constants'
import {logo, menu, close} from '../assets'
import Logo2 from '../assets/Logo2.png'

const Navbar = () => {
  const [active, setActive] = useState("")
  return (
   <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
    <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
      <Link to="/" className='flex items-center gap-2' ocClick={() => {
        setActive("")
        window.scroll(0,0)
      }} >
      <img src={Logo2} className='w-9 h-9 object-contain'/>
      <p className='text-white text-[18px] font-bold cursor-pointer'>Boyan <span className='sm:block hidden'>| javaScript Mastery</span></p>
      </Link>
    </div>
   </nav>
  )
}

export default Navbar