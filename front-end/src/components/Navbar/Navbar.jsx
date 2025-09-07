import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = ({ setShowLogin }) => {
  console.log("setShowLogin inside Navbar:", setShowLogin); // Capital L
  const [Menu, setMenu] = useState("Home");

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo" />

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("Home")} className={Menu === "Home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("Menu")} className={Menu === "Menu" ? "active" : ""}>Menu</a>
        <li
          onClick={() => setMenu("Cart")}
          className={`navbar-cart ${Menu === "Cart" ? "active" : ""}`}
        >
          Cart
          <span className="dot"></span>
        </li>
        <a href='#footer' onClick={() => setMenu("Contact-us")} className={Menu === "Contact-us" ? "active" : ""}>Contact Us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search food" />
        <button onClick={() => setShowLogin(true)}>Sign in</button> {/* Now works */}
      </div>
    </div>
  )
}

export default Navbar
