import React from 'react';
import { useCart } from '../context/CartContext';

const Item = ({ item }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="item-card">
      <img className="item-image" src={item.img} alt={item.name} />
      <div className="item-details">
        <h3 className="item-name">{truncateText(item.name, 15)}</h3>
        <p className="item-price">${truncateText(item.price, 20)}</p>
        <button className='add-to-cart-button' onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Item;