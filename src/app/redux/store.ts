// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    category: categoryReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
