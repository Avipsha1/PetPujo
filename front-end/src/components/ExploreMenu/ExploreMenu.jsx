import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ExploreMenu.css";
import { StoreContext } from "../../context/StoreContext";

const ExploreMenu = ({ category, setCategory }) => {
  const navigate = useNavigate();
  const { categories } = useContext(StoreContext); // fetch categories from DB

  const handleCategoryClick = (category_name) => {
    setCategory(category_name);
    navigate("/menu", { state: { selectedCategory: category_name } });
  };

  return (
    <div id="explore-menu" className="explore-menu">
      <h2>Explore Menu</h2>
      <div className="explore-menu-list">
        {categories.map((item) => (
          <div
            key={item.category_id}
            className={`menu-item ${category === item.category_name ? "active" : ""}`}
            onClick={() => handleCategoryClick(item.category_name)}
          >
            <img src={item.category_image || ""} alt={item.category_name} />
            <p>{item.category_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
