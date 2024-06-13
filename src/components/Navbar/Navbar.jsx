import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search_icon.svg'
import bell from '../../assets/bell_icon.svg'
import profile_icon from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'

function Navbar() {

  let navRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
        if (navRef.current) { 
            if (window.scrollY >= 30) {
                navRef.current.classList.add('nav-dark');
            } else {
                navRef.current.classList.remove('nav-dark');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>Tv Show</li>
          <li>Movie</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse My Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search} alt="" className='icons' />
        <p>Children</p>
        <img src={bell} alt="" className='icons' />
        <div className="navbar-profile">
        <img src={profile_icon} alt="" className='profile' />
        <img src={caret_icon} alt=""  />
        <div className="dropdown">
          <p onClick={() => logout()}>Sign Out of Netflix</p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
