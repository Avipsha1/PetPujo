import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from "axios";   // ✅ ADDED

const FoodDisplay = ({ category }) => {
  const { 
    menu: food_list = [], 
    addToCart, 
    removeFromCart, 
    cartItems, 
    setMessage 
  } = useContext(StoreContext);

  const navigate = useNavigate();

  // Filter items with ID 23-30
  const filteredItems = food_list.filter(
    (item) => item.item_id >= 23 && item.item_id <= 30
  );

  // ✅ Wrapper to check login + save to backend
  const handleAddToCart = async (item_id) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setMessage("⚠️ Please login to add items to cart");
      return;
    }

    // 1️⃣ UI update
    addToCart(item_id);

    // 2️⃣ Backend save (Neon DB)
    const price = food_list.find((i) => i.item_id === item_id)?.price || 0;

    try {
      await axios.post("http://localhost:3000/api/cart/add", {
        user_id: user.user_id,
        item_id,
        quantity: 1,
        price
      });

      console.log("Item stored in Neon DB");
    } catch (err) {
      console.error("Cart save error:", err);
    }
  };

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      <div className='food-display-list'>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const count = cartItems[item.item_id] || 0;

            return (
              <div key={index} className='food-item'>
                <img
                  src={item.image_url || assets.placeholder}
                  alt={item.item_name}
                  className="food-img"
                />

                {count === 0 ? (
                  <img
                    className='add'
                    onClick={() => handleAddToCart(item.item_id)} 
                    src={assets.add_icon_white}
                    alt='add'
                  />
                ) : (
                  <div className='food-item-counter'>
                    <img
                      onClick={() => removeFromCart(item.item_id)}
                      src={assets.remove_icon_red}
                      alt='remove'
                    />
                    <p>{count}</p>
                    <img
                      onClick={() => {
                        if (count < 3) handleAddToCart(item.item_id);
                      }}
                      src={assets.add_icon_green}
                      alt='add'
                      style={{ opacity: count >= 3 ? 0.6 : 1 }}
                    />
                  </div>
                )}

                <p className='food-name'>{item.item_name}</p>
                <p className='food-price'>₹{item.price}</p>
              </div>
            );
          })
        ) : (
          <p>No items available</p>
        )}
      </div>

      <div className='more-btn-container'>
        <button
          className='more-btn'
          onClick={() => navigate('/menu')}
        >
          More Dishes →
        </button>
      </div>
    </div>
  );
};

export default FoodDisplay;
