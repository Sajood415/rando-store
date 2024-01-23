import React, { useState, useEffect } from 'react';
import Item from './Item';
import api from '../services/api';
import Navbar from './Navbar';
import NewItemModal from './NewItem';

const ListingPage = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddItem = async (newItem) => {
    try {
      await api.addItem(newItem);
      fetchItems();
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  const fetchItems = async () => {
    try {
      const data = await api.getItems();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <Navbar showCartIcon={true} showAddItemButton={true} showModal={() => setModalOpen(true)} />
      <div className="item-grid">
        {items.map((item) => (
          <div key={item.id} className="grid-item">
            <Item item={item} />
          </div>
        ))}
      </div>
      <NewItemModal isOpen={isModalOpen} closeModal={() => setModalOpen(false)} onAddItem={handleAddItem} />
    </div>
  );
};

export default ListingPage;