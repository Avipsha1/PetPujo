import React from 'react'
import './FoodItem.css'
import { assets } from "../../assets/assets"; 
const FoodItem = ({id,name,price,image}) => {
  return (
    <div className='food-item'>
      <div className='food-item-img-containter'>
        <img className='food-item-image' src={image} alt="" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_stars} alt="" />
            <p className="food-item-price">₹{price}</p>
        </div>
      </div>
    </div>
  )
}

export default FoodItem
