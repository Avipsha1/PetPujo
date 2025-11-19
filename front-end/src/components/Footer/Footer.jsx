import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        {/* === Left Section === */}
        <div className="footer-section footer-left">
          <img src={assets.logo1} alt="UniEats Logo" className="footer-logo" />
          <p className="footer-tagline">"Powered by students, <br /> served with love"</p>
        </div>

        {/* === Center Section === */}
        <div className="footer-section footer-center">
          <h2 className="footer-title">COMPANY</h2>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* === Right Section === */}
        <div className="footer-section footer-right">
          <h2 className="footer-title">CONTACT US</h2>
          <ul className="footer-contact">
            <li>📞 +91 12345 67890</li>
            <li>📧 unieats@gmail.com</li>
            <li>📍 Campus Food Court</li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />

      <p className="footer-copyright">
        © 2025 Food Court. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
