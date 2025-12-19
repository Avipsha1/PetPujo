import React from "react";
import { createOrder, verifyPayment } from "../../services/paymentService";

/**
 * Opens Razorpay payment popup
 * @param {number} amount - Amount in paise
 * @param {object} prefillData - { name, email, contact }
 */
export const openRazorpay = async (amount, prefillData = {}) => {
  try {
    // 1️⃣ Create order via backend
    const order = await createOrder(amount); // amount in paise

    // 2️⃣ Razorpay options
    const options = {
      key: "RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
      amount: order.amount,
      currency: order.currency,
      name: "Food Court", // Your app or company name
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          // 3️⃣ Verify payment via backend
          await verifyPayment(response);
          alert("Payment Successful!");
          // Optional: redirect to success page here
        } catch {
          alert("Payment verification failed!");
        }
      },
      prefill: {
        name: prefillData.name || "",
        email: prefillData.email || "",
        contact: prefillData.contact || "",
      },
      theme: { color: "#3399cc" },
    };

    // 4️⃣ Open Razorpay popup
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    alert("Error initiating payment!");
    console.error(error);
  }
};
