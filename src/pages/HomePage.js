import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage = () => {

  return (
    <div className="home-page">
      <Navbar showCartIcon={false} showAddItemButton={false} />
      <div className="card-container">
        <Link to="/list-items" className="card" style={{ cursor: 'pointer' }}>
          <h3>All Items</h3>
          <p>View all available items</p>
        </Link>
        <Link to="/cart" className="card" style={{ cursor: 'pointer' }}>
          <h3>Checkout</h3>
          <p>Review and checkout your items</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;