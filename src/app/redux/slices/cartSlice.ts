// src/app/redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

// Define the cart item interface that extends Product
export interface CartItem extends Product {
  quantity: number;
}

// Define the cart state
interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

// Function to load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (error) {
        console.log('Failed to parse cart from localStorage:', error);
      }
    }
  }
  return [];
};

// Function to save cart to localStorage
const saveCartToStorage = (items: CartItem[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(items));
  }
};

// Initial state
const initialState: CartState = {
  items: loadCartFromStorage(),
  isLoading: false,
  error: null,
};

// Create cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.items.findIndex(item => item._id === action.payload._id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        state.items[existingItemIndex].quantity += 1;
      } else {
        // Add new item with quantity 1
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }
      
      saveCartToStorage(state.items);
    },
    
    // Remove item from cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      saveCartToStorage(state.items);
    },
    
    // Update item quantity
    updateQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
      const { _id, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item._id === _id);
      
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or negative
          state.items = state.items.filter(item => item._id !== _id);
        } else {
          state.items[itemIndex].quantity = quantity;
        }
        saveCartToStorage(state.items);
      }
    },
    
    // Increment item quantity
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(item => item._id === action.payload);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
        saveCartToStorage(state.items);
      }
    },
    
    // Decrement item quantity
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(item => item._id === action.payload);
      if (itemIndex >= 0) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        } else {
          // Remove item if quantity would become 0
          state.items = state.items.filter(item => item._id !== action.payload);
        }
        saveCartToStorage(state.items);
      }
    },
    
    // Clear cart
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
    
    // Handle loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    // Handle error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setLoading,
  setError
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartItemsCount = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + (item.unit_price * item.quantity), 0);
export const selectIsLoading = (state: { cart: CartState }) => state.cart.isLoading;
export const selectError = (state: { cart: CartState }) => state.cart.error;

// Export reducer
export default cartSlice.reducer;