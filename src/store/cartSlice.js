import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Payload can include: id, name, price (unit), image, discount, options (object), quantity
      const { id, options = {}, quantity = 1 } = action.payload;
      const optionsKey = JSON.stringify(options);

      // Find existing item by id and options
      const existingItem = state.items.find(item => item.id === id && JSON.stringify(item.options || {}) === optionsKey);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        const cartItemId = `${id}-${Math.random().toString(36).slice(2,9)}`;
        state.items.push({ ...action.payload, quantity, options, cartItemId });
      }

      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    removeFromCart: (state, action) => {
      const cartId = action.payload;
      state.items = state.items.filter(item => item.cartItemId !== cartId);
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.items.find(item => item.cartItemId === cartItemId);
      
      if (item) {
        item.quantity = quantity;
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;