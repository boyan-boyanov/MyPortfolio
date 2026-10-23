import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './customStyles/Navbar.css'
import { navLinks, socialLinks, externalLinkProps } from '../constants'
import { menu, close } from '../assets'
import Logo2 from '../assets/Logo2.png'
import { GitHubIcon, LinkedInIcon } from './SocialIcons'

const profileLinks = [
  { href: socialLinks.github, label: 'GitHub profile', Icon: GitHubIcon },
  { href: socialLinks.linkedin, label: 'LinkedIn profile', Icon: LinkedInIcon },
]

// Same colors as the nav links: gray by default, white on hover
const iconLinkClassName =
  'custom-secondary nav-links inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary'

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
          <p className='custom-white text-[18px] font-bold cursor-pointer flex'>Boyan Boyanov &nbsp;
            <span className='sm:block hidden'>- Frontend Engineer</span></p>
        </Link>
        <div className='hidden sm:flex items-center'>
          <ul className='list-none flex flex-row gap-10'>
            {navLinks.map((link) => (
              <li key={link.id} className={`${active === link.title ? "custom-white" : "custom-secondary"} 
              text-[18px] font-medium cursor-pointer nav-links`} onClick={() => setActive(link.title)}>
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
          {/* About · Work · Contact | GitHub · LinkedIn */}
          <span aria-hidden='true' className='mx-6 h-5 w-px bg-secondary/40' />
          <div className='flex items-center gap-5'>
            {profileLinks.map((link) => (
              <a key={link.label} href={link.href} aria-label={link.label} {...externalLinkProps} className={iconLinkClassName}>
                <link.Icon />
              </a>
            ))}
          </div>
        </div>
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img src={toggle ? close : menu} alt="menu" className='w-[28px] h-[28px] object-contain cursor-pointer' onClick={() => setToggle(!toggle)} />
          <div className={`${toggle ? "flex" : "hidden"} mobile-menu flex-col`}>
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
            <span aria-hidden='true' className='my-4 h-px w-full bg-secondary/40' />
            <div className='flex items-center gap-5'>
              {profileLinks.map((link) => (
                <a key={link.label} href={link.href} aria-label={link.label} {...externalLinkProps} className={iconLinkClassName}
                  onClick={() => setToggle(false)}>
                  <link.Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
