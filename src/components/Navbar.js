import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Navbar = ({ showCartIcon, showAddItemButton, showModal }) => {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Welcome to Rando store</h2>
      </div>
      <div className="navbar-right">
        {showCartIcon && (
          <Link to="/cart">
            <div className="cart-icon-container">
              <FaShoppingCart className="cart-icon" />
              {cart.length > 0 && (
                <div className="cart-counter">
                  {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                </div>
              )}
            </div>
          </Link>
        )}
        {showAddItemButton && (
          <button className="add-item-button" onClick={showModal}>
            Add New Item
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;