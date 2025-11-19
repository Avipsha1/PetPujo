const pool = require("../config/db");

// --------------------------------------------------------
// ADD ITEM TO CART
// --------------------------------------------------------
exports.addToCart = async (req, res) => {
  try {
    const { user_id, item_id, quantity, price } = req.body;

    // Validate inputs
    if (!user_id || !item_id || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // 1️⃣ Check if user already has a cart
    const cartResult = await pool.query(
      "SELECT cart_id FROM cart WHERE user_id = $1",
      [user_id]
    );

    let cart_id;

    if (cartResult.rows.length === 0) {
      // 2️⃣ Create new cart
      const newCart = await pool.query(
        "INSERT INTO cart (user_id, created_at) VALUES ($1, NOW()) RETURNING cart_id",
        [user_id]
      );
      cart_id = newCart.rows[0].cart_id;
    } else {
      cart_id = cartResult.rows[0].cart_id;
    }

    // 3️⃣ Check if item already exists in cart
    const existingItem = await pool.query(
      "SELECT * FROM cartitem WHERE cart_id = $1 AND item_id = $2",
      [cart_id, item_id]
    );

    if (existingItem.rows.length > 0) {
      // 4️⃣ Update quantity + subtotal
      await pool.query(
        `UPDATE cartitem 
         SET quantity = quantity + $1, 
             subtotal = (quantity + $1) * price 
         WHERE cart_id = $2 AND item_id = $3`,
        [quantity, cart_id, item_id]
      );
    } else {
      // 5️⃣ Insert new cart item
      await pool.query(
        `INSERT INTO cartitem (cart_id, item_id, quantity, price, subtotal)
         VALUES ($1, $2, $3, $4, $5)`,
        [cart_id, item_id, quantity, price, quantity * price]
      );
    }

    res.json({
      success: true,
      message: "Item added to cart successfully",
    });

  } catch (error) {
    console.error("Cart Add Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
