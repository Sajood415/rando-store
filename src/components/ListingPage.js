import React, { useState, useEffect } from 'react';
import Item from './Item';
import api from '../services/api';
import Navbar from './Navbar';
import NewItemModal from './NewItem';

const ListingPage = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const filterAndSortItems = () => {
    let filteredItems = items;

    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case 'lowToHigh':
        filteredItems.sort((a, b) => a.price - b.price);
        break;
      case 'highToLow':
        filteredItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filteredItems;
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredAndSortedItems = filterAndSortItems();

  return (
    <div>
      <Navbar showCartIcon={true} showAddItemButton={true} showModal={() => setModalOpen(true)} />
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by item name..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select value={sortOption} onChange={handleSort} className="sort-dropdown">
          <option value="default">Sort by</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
      {filteredAndSortedItems.length === 0 ? (
        <div className="no-items-message">Oops... No items were found :(</div>
      ) : (
        <div className="item-grid">
          {filteredAndSortedItems.map((item) => (
            <div key={item.id} className="grid-item">
              <Item item={item} />
            </div>
          ))}
        </div>
      )}
      <NewItemModal isOpen={isModalOpen} closeModal={() => setModalOpen(false)} onAddItem={handleAddItem} />
    </div>
  );
};

export default ListingPage;
