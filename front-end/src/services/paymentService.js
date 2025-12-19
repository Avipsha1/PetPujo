import axios from "axios";

// Function to create a Razorpay order via backend
export const createOrder = async (amount) => {
  try {
    const response = await axios.post("http://localhost:3000/api/payment/create-order", {
      amount, // Amount in paise (₹500 = 50000)
    });
    return response.data; // Returns { id, amount, currency }
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Function to verify Razorpay payment via backend
export const verifyPayment = async (paymentData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/payment/verify", paymentData);
    return response.data; // Returns { message: "Payment verified" }
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};
