import React, { useContext, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext)
  const [itemCount, setItemCount] = useState(0)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      <div className='food-display-list'>
        {food_list.map((item, index) => (
          <div key={index} className='food-item'>
            <img src={item.image} alt={item.name} />

            {!itemCount ? (
              <img
                className='add'
                onClick={() => setItemCount(prev => prev + 1)}
                src={assets.add_icon_white}
                alt=''
              />
            ) : (
              <div className='food-item-counter'>
                <img
                  onClick={() => setItemCount(prev => Math.max(prev - 1, 0))}
                  src={assets.remove_icon_red}
                  alt='remove'
                />
                <p>{itemCount}</p>
                <img
                  onClick={() => setItemCount(prev => prev + 1)}
                  src={assets.add_icon_green}
                  alt='add'
                />
              </div>
            )}

            <p className='food-name'>{item.name}</p>
            <p className='food-price'>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FoodDisplay
