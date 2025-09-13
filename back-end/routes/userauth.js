const express = require("express");
const router = express.Router();
const validator = require("validator");
const pool = require("../config/db"); // DB connection
const jwt = require("jsonwebtoken");
require("dotenv").config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);


// ----------------- REGISTER -----------------
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        status: "Error",
        message: "Please enter a valid email"
      });
    }

    // 2. Check if email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        status: "Error",
        message: "Email already registered"
      });
    }

    // 3. Validate password strength
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
    ) {
      return res.status(400).json({
        status: "Error",
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol"
      });
    }

    // 4. Insert new user (consider hashing the password in production)
    await pool.query(
      "INSERT INTO users (user_name, user_email, password) VALUES ($1, $2, $3)",
      [name, email, password]
    );

    res.status(201).json({
      status: "Success",
      message: "User registered successfully"
    });
  } catch (err) {
    console.error(err);
    // Handle duplicate key error
    if (err.code === "23505") {
      return res.status(400).json({
        status: "Error",
        message: "Email already registered"
      });
    }

    res.status(500).json({
      status: "Error",
      message: "Registration failed"
    });
  }
});

// ----------------- LOGIN -----------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE user_email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        status: "Error",
        message: "Invalid credentials"
      });
    }

    const user = result.rows[0];

    // 1. Generate JWT token
    const token = jwt.sign(
      { id: user.user_id, email: user.user_email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    // 2. Send token and user info to frontend
    res.json({
      status: "Success",
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        name: user.user_name,
        email: user.user_email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Error",
      message: "Login failed"
    });
  }
});

module.exports = router;
