import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { openRazorpay } from "../../components/RazorPay/RazorPay.js";

const PlaceOrder = () => {
  const { getTotalCartAmount, getPackagingFee, setMessage } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const packagingfee = getPackagingFee();
  const totalAmount = getTotalCartAmount() + packagingfee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentClick = () => {
    // 1️⃣ Check if cart is empty
    if (getTotalCartAmount() === 0) {
      setMessage("❌ Cart is empty! Add items before payment.");
      return;
    }

    // 2️⃣ Validate each input field
    if (!formData.firstName.trim()) {
      setMessage("❌ Please fill First Name");
      return;
    }
    if (!formData.lastName.trim()) {
      setMessage("❌ Please fill Last Name");
      return;
    }
    if (!formData.email.trim()) {
      setMessage("❌ Please fill Email Address");
      return;
    }
    if (!formData.phone.trim()) {
      setMessage("❌ Please fill Phone Number");
      return;
    }

    // ✅ All fields filled, proceed to Razorpay
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
            />
            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
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

        <button className="place-order-btn" onClick={handlePaymentClick}>
          PROCEED TO PAYMENT
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
