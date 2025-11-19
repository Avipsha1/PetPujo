const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // your mysql connection

// ----------------------------
// GET ALL MENU ITEMS WITH CATEGORY
// ----------------------------
router.get("/", async (req, res) => {
    try {
        const query = `
      SELECT 
        m.item_id, 
        m.item_name, 
        m.category_id,
        c.category_name,
        m.price,
        m.availability,
        m.image_url
      FROM menu m
      LEFT JOIN category c
      ON m.category_id = c.category_id
    `;

        const result = await pool.query(query);
        const rows = result.rows; // extract rows array
        res.json({ success: true, data: rows });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Menu items does not fetching" });
    }
});

// ----------------------------
// GET CATEGORIES
// ----------------------------

// Categories route
router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM category"); // PostgreSQL
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Category API error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;