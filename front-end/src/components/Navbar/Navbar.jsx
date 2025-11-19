import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext"; // ✅ Import context for cart items

const Navbar = ({ setShowLogin, user, setUser }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Access cart items from context
  const { cartItems } = useContext(StoreContext);

  // ✅ Calculate total quantity in cart
  const totalCartItems = Object.values(cartItems).reduce(
    (total, qty) => total + qty,
    0
  );

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  // Close menu after clicking any menu link (for mobile)
  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar">
      {/* ===== Left Section: Logo ===== */}
      <Link to="/" onClick={handleMenuClick}>
        <img src={assets.logo2} alt="Logo" className="logo" />
      </Link>

      {/* ===== Center Section: Navigation Menu ===== */}
      <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        <Link
          to="/"
          className={currentPath === "/" ? "active" : ""}
          onClick={handleMenuClick}
        >
          Home
        </Link>

        <Link
          to="/menu"
          className={currentPath === "/menu" ? "active" : ""}
          onClick={handleMenuClick}
        >
          Menu
        </Link>

        <Link
          to="/about"
          className={currentPath === "/about" ? "active" : ""}
          onClick={handleMenuClick}
        >
          About
        </Link>

        <a
          href="/contact"
          className={currentPath === "/contact" ? "active" : ""}
          onClick={handleMenuClick}
        >
          Contact Us
        </a>
      </ul>

      {/* ===== Right Section: Search + Basket + User ===== */}
      <div className="navbar-right">

        {/* Basket Icon */}
        <Link to="/cart" className="basket-container" onClick={handleMenuClick}>
          <img src={assets.basket_icon} alt="Basket" className="basket-icon" />

          {/* ✅ Show dot only if cart has items */}
          {totalCartItems > 0 && (
            <img
              src={assets.selector_icon}
              alt="Notification Dot"
              className="basket-dot"
            />
          )}
        </Link>

        {/* User Section */}
        {user ? (
          <div className="navbar-user">
            <span className="navbar-username">Hello, {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              <img
                src={assets.logout_icon}
                alt="logout"
                className="logout-icon"
              />
            </button>
          </div>
        ) : (
          <button className="signin-btn" onClick={() => setShowLogin(true)}>
            Sign in
          </button>
        )}

        {/* ===== Menu Icon (Visible only on small screens) ===== */}
        <img
          src={assets.menu}
          alt="menu"
          className="menu-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>
    </div>
  );
};

export default Navbar;
