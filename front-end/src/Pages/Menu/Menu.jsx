import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Menu.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Menu = () => {
  const location = useLocation();
  const initialCategory = location.state?.selectedCategory || "All";
  const [category, setCategory] = useState(initialCategory);

  const { menu, categories, addToCart, removeFromCart, cartItems, setMessage } =
    useContext(StoreContext); // ✅ add setMessage from context

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category]);

  // ✅ Wrapper to check login before adding to cart
  const handleAddToCart = (itemId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setMessage("⚠️ To add a item in cart, first login");
      return;
    }
    addToCart(itemId);
  };

  if (!menu || menu.length === 0) {
    return <h2>Loading menu...</h2>;
  }

  return (
    <div className="menu-page">
      <aside className="menu-sidebar">
        <h2>Categories</h2>
        <ul>
          <li
            className={category === "All" ? "active" : ""}
            onClick={() => setCategory("All")}
          >
            All
          </li>
          {categories.map((cat) => (
            <li
              key={cat.category_id}
              className={category === cat.category_name ? "active" : ""}
              onClick={() => setCategory(cat.category_name)}
            >
              <span>{cat.category_name}</span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="menu-content">
        <h1>{category === "All" ? "All Dishes" : category}</h1>

        <div className="menu-grid">
          {menu
            .filter((item) => category === "All" || item.category_name === category)
            .map((item) => (
              <div className="food-card" key={item.item_id}>
                <img
                  src={item.image_url || assets.placeholder}
                  alt={item.item_name}
                  className="food-img"
                />

                {/* CART BUTTONS */}
                {!cartItems[item.item_id] ? (
                  <img
                    className="add"
                    onClick={() => handleAddToCart(item.item_id)} // ✅ changed here
                    src={assets.add_icon_white}
                    alt="add"
                  />
                ) : (
                  <div className="food-item-counter">
                    <img
                      onClick={() => removeFromCart(item.item_id)}
                      src={assets.remove_icon_red}
                      alt="remove"
                    />
                    <p>{cartItems[item.item_id]}</p>
                    <img
                      onClick={() => {
                        if (cartItems[item.item_id] < 3)
                          handleAddToCart(item.item_id); // ✅ changed here
                      }}
                      src={assets.add_icon_green}
                      alt="add"
                      style={{
                        opacity: cartItems[item.item_id] >= 3 ? 0.6 : 1,
                        cursor:
                          cartItems[item.item_id] >= 3 ? "not-allowed" : "pointer",
                      }}
                    />
                  </div>
                )}

                <p className="food-name">{item.item_name}</p>
                <p className="food-price">₹{item.price}</p>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default Menu;
