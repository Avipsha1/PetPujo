import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // ✅ Login popup state
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

  // Remove item from cart
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

  // ✅ Packaging fee = ₹5 per item
  const getPackagingFee = () => {
    const totalItems = Object.values(cartItems).reduce(
      (sum, qty) => sum + qty,
      0
    );
    return totalItems * 5;
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
    getPackagingFee, // ✅ added
    showLogin,
    setShowLogin,
    message,
    setMessage,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
