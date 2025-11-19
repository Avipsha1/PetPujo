import React, { useContext, useEffect } from 'react';
import "./App.css";
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Menu from './Pages/Menu/Menu';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import { StoreContext } from './context/StoreContext'; // ✅ Import context

const App = () => {
  const { showLogin, setShowLogin, message, setMessage } = useContext(StoreContext);

  // Lifted user state to App so Navbar and LoginPopup can share it
  const [user, setUser] = React.useState(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return storedUser && token ? JSON.parse(storedUser) : null;
  });

  // ✅ Auto-hide global message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  return (
    <>
      {/* ✅ Login Popup rendered from StoreContext state */}
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
          <Route path='/' element={<Home setShowLogin={setShowLogin} setMessage={setMessage} />} />
          <Route path='/menu' element={<Menu setShowLogin={setShowLogin} setMessage={setMessage} />} /> 
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
