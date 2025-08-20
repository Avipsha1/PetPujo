import React, {useState} from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
  const [Menu,setMenu]=useState("Home");
  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <li>Home</li>
        <li>Menu</li>
        <li>Cart</li>
        <li>Contact Us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search food" />
        <div className="navbar-search-icon">
          <div className="dot"></div>
        </div>
        <button>Sign in</button>
      </div>
    </div>
  )
}

export default Navbar
