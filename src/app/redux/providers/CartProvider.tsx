import React, { createContext, useContext, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  CartItem,
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
  selectIsLoading,
  selectError
} from '../slices/cartSlice';
import { RootState } from '../store';

// Define the cart context type
interface CartContextType {
  // Cart state
  items: CartItem[];
  itemCount: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  
  // Cart actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clearAllItems: () => void;
  
  // Helper methods
  isItemInCart: (id: string) => boolean;
  getItemById: (id: string) => CartItem | undefined;
}

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider props
interface CartProviderProps {
  children: ReactNode;
}

// Cart provider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  
  // Select cart state from Redux store
  const items = useSelector((state: RootState) => selectCartItems(state));
  const itemCount = useSelector((state: RootState) => selectCartItemsCount(state));
  const total = useSelector((state: RootState) => selectCartTotal(state));
  const isLoading = useSelector((state: RootState) => selectIsLoading(state));
  const error = useSelector((state: RootState) => selectError(state));
  
  // Define cart actions
  const addItem = (item: CartItem) => {
    dispatch(addToCart(item));
  };
  
  const removeItem = (_id: string) => {
    dispatch(removeFromCart(_id));
  };
  
  const updateItemQuantity = (_id: string, quantity: number) => {
    dispatch(updateQuantity({ _id, quantity }));
  };
  
  const incrementItem = (_id: string) => {
    dispatch(incrementQuantity(_id));
  };
  
  const decrementItem = (_id: string) => {
    dispatch(decrementQuantity(_id));
  };
  
  const clearAllItems = () => {
    dispatch(clearCart());
  };
  
  // Helper methods
  const isItemInCart = (_id: string): boolean => {
    return items.some(item => item._id === _id);
  };
  
  const getItemById = (_id: string): CartItem | undefined => {
    return items.find(item => item._id === _id);
  };
  
  // Create context value
  const contextValue: CartContextType = {
    items,
    itemCount,
    total,
    isLoading,
    error,
    addItem,
    removeItem,
    updateItemQuantity,
    incrementItem,
    decrementItem,
    clearAllItems,
    isItemInCart,
    getItemById
  };
  
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
