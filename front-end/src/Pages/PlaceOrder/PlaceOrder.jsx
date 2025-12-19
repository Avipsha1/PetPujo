import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { openRazorpay } from "../../components/RazorPay/RazorPay";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const packagingfee = getTotalCartAmount() === 0 ? 0 : 30;
  const totalAmount = getTotalCartAmount() + packagingfee;

  // Update form data on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle payment button click
  const handlePaymentClick = () => {
    const prefillData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      contact: formData.phone,
    };
    openRazorpay(totalAmount * 100, prefillData); // amount in paise
  };

  return (
    <div className="place-order">
      <div className="place-order-left">
        <h2>Delivery Information</h2>
        <form className="delivery-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
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
            <b>₹{totalAmount}</b>
          </div>
        </div>

        {/* Keep your original button */}
        <button className="place-order-btn" onClick={handlePaymentClick}>
          PROCEED TO PAYMENT
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
