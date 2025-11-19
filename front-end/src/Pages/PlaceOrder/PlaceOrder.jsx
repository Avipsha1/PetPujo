import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const packagingfee = getTotalCartAmount() === 0 ? 0 : 30; // You can change the delivery fee

  return (
    <div className="place-order">
      <div className="place-order-left">
        <h2>Delivery Information</h2>
        <form className="delivery-form">
          <div className="form-row">
            <input type="text" placeholder="First name" required />
            <input type="text" placeholder="Last name" required />
          </div>
          <input type="email" placeholder="Email address" required />
          <input type="text" placeholder="Phone" required />
        </form>
      </div>

      <div className="place-order-right">
        <h2>Cart Totals</h2>
        <div className="cart-totals-details">
          <div className="cart-total-item">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <div className="cart-total-item">
            <p>Packaging Fee</p>
            <p>₹{packagingfee}</p>
          </div>
          <hr />
          <div className="cart-total-item total">
            <b>Total</b>
            <b>₹{getTotalCartAmount() + packagingfee}</b>
          </div>
        </div>

        <button className="place-order-btn">PROCEED TO PAYMENT</button>
      </div>
    </div>
  );
};

export default PlaceOrder;
