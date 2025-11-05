import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { styles } from '../styles'
import './customStyles/Navbar.css'
import { navLinks } from '../constants'
import { logo, menu, close } from '../assets'
import Logo2 from '../assets/Logo2.png'

const Navbar = () => {
  const [active, setActive] = useState("")
  const [toggle, setToggle] = useState(false)

  return (
    <nav className='navbar'>
      <div className='navigation-container'>
        <Link to="/" className='flex items-center gap-2' onClick={() => {
          setActive("")
          window.scroll(0, 0)
        }} >
          <img src={Logo2} className='w-9 h-9 object-contain' />
          <p className='custom-white text-[18px] font-bold cursor-pointer flex'>Boyan &nbsp;
            <span className='sm:block hidden'>| JS Mastery</span></p>
        </Link>
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((link) => (
            <li key={link.id} className={`${active === link.title ? "custom-white" : "custom-secondary"} 
            text-[18px] font-medium cursor-pointer nav-links`} onClick={() => setActive(link.title)}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img src={toggle ? close : menu} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer' onClick={() => setToggle(!toggle)} />
          <div className={`${toggle ? "flex" : "hidden"} mobile-menu`}>
            <ul className='list-none flex justify-end items-start flex-col gap-4'>
              {navLinks.map((link) => (
                <li key={link.id} className={`${active === link.title ? "custom-white" : "custom-secondary"} 
                    text-[16px] font-medium cursor-pointer font-poppins`} onClick={() => {
                    setToggle(false)
                    setActive(link.title)
                  }}>
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar