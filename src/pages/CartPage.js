import React from 'react';
import Cart from '../components/Cart';
import Navbar from '../components/Navbar';

const CartPage = () => {
  return (
    <div className="cart-page">
      <Navbar showCartIcon={false} showAddItemButton={false} />
      <Cart />
    </div>
  );
};

export default CartPage;