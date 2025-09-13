import React, { useState, useEffect } from 'react';
import "./App.css";
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  // Lifted user state to App so Navbar and LoginPopup can share it
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return storedUser && token ? JSON.parse(storedUser) : null;
  });

  // ✅ Global message state
  const [message, setMessage] = useState(null);

  // ✅ Auto-hide after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {showLogin && (
        <LoginPopup setShowLogin={setShowLogin} setUser={setUser} setMessage={setMessage} />
      )}

      {/* ✅ Global toast */}
      {message && (
        <div className={`toast ${message.startsWith("✅") ? "success" : "error"}`}>
          {message}
        </div>
      )}


      <div className='app'>
        <Navbar setShowLogin={setShowLogin} user={user} setUser={setUser} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
