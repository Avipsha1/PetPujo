import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin, user, setUser }) => {
  const [Menu, setMenu] = useState("Home");

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null); // Update parent state
  };

  return (
    <div className="navbar">
      <img src={assets.logo} alt="Logo" className="logo" />

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={Menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={Menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <li
          onClick={() => setMenu("Cart")}
          className={`navbar-cart ${Menu === "Cart" ? "active" : ""}`}
        >
          Cart
          <span className="dot"></span>
        </li>
        <a
          href="#footer"
          onClick={() => setMenu("Contact-us")}
          className={Menu === "Contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search food" />

        {user ? (
          <div className="navbar-user">
            <span className="navbar-username">Hello, {user.name}</span>
            <button onClick={handleLogout}>
              <img
                src={assets.logout_icon}
                alt="logout"
                className="logout-icon"
              />
            </button>
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
