import { createOrder, verifyPayment } from "../../services/paymentservice";

export const openRazorpay = async (amount, prefillData) => {
  try {
    // 1️⃣ Create order from backend
    const order = await createOrder(amount);

    // 2️⃣ Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // PUBLIC KEY ONLY
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "UniEats",
      description: "Food Order Payment",
      prefill: prefillData,

      handler: async function (response) {
        const verifyRes = await verifyPayment(response);
        if (verifyRes.success) {
          alert("Payment successful 🎉");
        } else {
          alert("Payment verification failed");
        }
      },

      theme: {
        color: "#ff4d4f",
      },
    };

    // 3️⃣ Open Razorpay checkout
    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error("Razorpay error:", err);
    alert("Payment failed");
  }
};
