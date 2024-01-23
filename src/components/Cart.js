import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cart, dispatch } = useCart();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch({ type: 'SET_CART', payload: storedCart });
  }, [dispatch]);

  const removeFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    dispatch({ type: 'SET_CART', payload: updatedCart });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } : cartItem
    );
    dispatch({ type: 'SET_CART', payload: updatedCart });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: Math.max(1, (cartItem.quantity || 1) - 1) } : cartItem
    );
    if (item.quantity === 1) {
      removeFromCart(item);
    } else {
      dispatch({ type: 'SET_CART', payload: updatedCart });
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const clearCart = () => {
    dispatch({ type: 'SET_CART', payload: [] });
    localStorage.removeItem('cart');
  };

  const getCartItemCounts = () => {
    const itemCounts = {};
    cart.forEach((item) => {
      if (item.id in itemCounts) {
        itemCounts[item.id]++;
      } else {
        itemCounts[item.id] = item.quantity || 1;
      }
    });
    return itemCounts;
  };

  const itemCounts = getCartItemCounts();

  return (
    <div className="cart">
      {cart.length === 0 ? (
        <h3>Your Cart is Empty</h3>
      ) : (
        <ul>
          {Object.keys(itemCounts).map((itemId) => {
            const item = cart.find((cartItem) => cartItem.id === parseInt(itemId, 10));
            return (
              <li key={itemId} className="cart-item">
                {item.img && <img src={item.img} alt={item.name} className="cart-item-img" />}
                <div className="cart-item-details">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>${item.price}</p>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => decreaseQuantity(item)}><FaMinus /></button>
                    <span>{itemCounts[itemId]}</span>
                    <button onClick={() => increaseQuantity(item)}><FaPlus /></button>
                    <button onClick={() => removeFromCart(item)}><FaTrash /></button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {cart.length > 0 && (
        <div className="cart-footer">
          <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;