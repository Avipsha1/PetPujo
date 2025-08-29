import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>"Powered by students,served with love"</p>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>Menu</li>
                        <li>About Us </li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>CONTACT US</h2>
                    <ul>
                        <p>📞 +91 12345 67890</p>
                        <p>📧 foodcourt123@gmail.com</p>
                        <p>📍 Campus Food Court</p>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                © 2025 Food Court. All rights reserved.
            </p>
        </div>
    )
}

export default Footer
