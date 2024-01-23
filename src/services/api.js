import axios from 'axios';

const BASE_URL = 'https://prickly-clam-tweed-jacket.cyclic.app';

const api = {
  getItems: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/items`);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },
  getItemById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item with ID ${id}:`, error);
      throw error;
    }
  },
  addItem: async (newItem) => {
    try {
      const response = await axios.post(`${BASE_URL}/items`, newItem);
      return response.data;
    } catch (error) {
      console.error('Error adding new item:', error);
      throw error;
    }
  },
};

export default api;
