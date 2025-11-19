import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);          
  const [categories, setCategories] = useState([]); 
  const [cartItems, setCartItems] = useState({});

  // ✅ New state for login popup
  const [showLogin, setShowLogin] = useState(false);
  const [message, setMessage] = useState(""); 

  // Fetch menu items
  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/menu");
      if (res.data && res.data.success) {
        setMenu(res.data.data);
      } else {
        console.error("Menu API returned invalid response:", res.data);
        setMenu([]);
      }
    } catch (err) {
      console.error("Menu fetch failed:", err);
      setMenu([]);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/menu/categories");
      if (res.data && res.data.success) {
        setCategories(res.data.data);
      } else {
        console.error("Categories API returned invalid response:", res.data);
        setCategories([]);
      }
    } catch (err) {
      console.error("Category fetch failed:", err);
      setCategories([]);
    }
  };

  // Add item to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // Remove item
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) updated[itemId]--;
      else delete updated[itemId];
      return updated;
    });
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = menu.find((m) => m.item_id === parseInt(id));
      return total + (item ? item.price * qty : 0);
    }, 0);
  };

  useEffect(() => {
    fetchMenu();
    fetchCategories();
  }, []);

  const value = {
    menu,
    categories,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    showLogin,      // ✅ new
    setShowLogin,   // ✅ new
    message,        // ✅ new
    setMessage      // ✅ new
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreContextProvider;
