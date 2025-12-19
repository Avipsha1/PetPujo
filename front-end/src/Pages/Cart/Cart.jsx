// src/pages/Cart/Cart.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";

const Cart = () => {
  const {
    cartItems,
    menu,
    removeFromCart,
    getTotalCartAmount,
    getPackagingFee,
    setMessage, // ✅ use App's toast system
  } = useContext(StoreContext);

  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0);
  const packagingFee = getPackagingFee();

  const navigate = useNavigate();

  // ✅ Checkout click handler
  const handleCheckout = () => {
    if (totalItems === 0) {
      setMessage("❌ Cart is empty! Add items before checkout.");
      return;
    }
    navigate("/order");
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-header">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>

          <hr />

          {menu.map((item) => {
            if (cartItems[item.item_id] > 0) {
              return (
                <div key={item.item_id} className="cart-row">
                  <img src={item.image_url || ""} alt={item.item_name} />
                  <p>{item.item_name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item.item_id]}</p>
                  <p>₹{item.price * cartItems[item.item_id]}</p>
                  <p
                    className="remove"
                    onClick={() => removeFromCart(item.item_id)}
                  >
                    ×
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="cart-bottom">
          <div className="cart-summary">
            <h2>Cart Totals</h2>

            <div className="summary-line">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <div className="summary-line">
              <p>Packaging Fee (₹5 × {totalItems} items)</p>
              <p>₹{packagingFee}</p>
            </div>

            <div className="summary-line total">
              <b>Total</b>
              <b>₹{getTotalCartAmount() + packagingFee}</b>
            </div>

            {/* ✅ Use App’s toast/message system */}
            <button onClick={handleCheckout} className="checkout-btn">
              PROCEED TO CHECKOUT
            </button>
          </div>

          <div className="promo-section">
            <h3>Apply Promo Code</h3>
            <p>If you have a promo code, enter it here</p>
            <div className="promo-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
