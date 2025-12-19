const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// ⭐ ADD THIS
const Razorpay = require("razorpay");
const crypto = require("crypto");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ---------------- EXISTING ROUTES (UNCHANGED) ----------------
const userauthRoutes = require("./routes/userauth");
app.use("/api/users", userauthRoutes);

const menuRoutes = require("./routes/menu");
app.use("/api/menu", menuRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);
// ------------------------------------------------------------


// ⭐ ADD THIS — Razorpay instance (ONLY ONCE)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// ⭐ ADD THIS — Create Order API
app.post("/api/payment/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount, // in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Order creation failed" });
  }
});


// ⭐ ADD THIS — Verify Payment API
app.post("/api/payment/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});


// ---------------- EXISTING CODE (UNCHANGED) ----------------
app.get("/", (req, res) => {
  return res.send("API working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
