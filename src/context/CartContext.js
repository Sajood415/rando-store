import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        const updatedState = state.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );

        localStorage.setItem('cart', JSON.stringify(updatedState));
        return updatedState;
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        const newState = [...state, newItem];

        localStorage.setItem('cart', JSON.stringify(newState));
        return newState;
      }

    case 'REMOVE_FROM_CART':
      const updatedState = state.filter((item) => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(updatedState));
      return updatedState;

    case 'INCREASE_QUANTITY':
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );

    case 'DECREASE_QUANTITY':
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) } : item
      );

    case 'CLEAR_CART':
      localStorage.removeItem('cart');
      return [];

    case 'SET_CART':
      return action.payload;

    default:
      return state;
  }
};



const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };