// src/app/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Updated interface for decoded token based on new JWT payload
export interface DecodedToken {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  shop: {
    id: string;
    name: string;
    email: string;
    phone: string;
    gst_number: string;
    location: {
      _id: string;
      name: string;
      street: string;
      city: string;
      state: string;
      pincode: string;
      locality: string;
      location_url: string;
      geo_location_id: string;
      tag: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    accept_online_orders: boolean;
    accept_online_payments: boolean;
    is_active: boolean;
    delivery_available: boolean;
  };
  iat: number;
  exp: number;
}

// Auth state
interface AuthState {
  token: string | null;
  user: DecodedToken | null;
  isAuthenticated: boolean;
}

// Load token from localStorage
const loadAuthFromStorage = (): AuthState => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          return {
            token,
            user: decoded,
            isAuthenticated: true,
          };
        } else {
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        console.log("Failed to decode auth token:", error);
      }
    }
  }
  return {
    token: null,
    user: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = loadAuthFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      try {
        const decoded: DecodedToken = jwtDecode(token);
        localStorage.setItem("authToken", token);
        state.token = token;
        state.user = decoded;
        state.isAuthenticated = true;
      } catch (error) {
        console.log("Invalid token:", error);
      }
    },
    logout: (state) => {
      localStorage.removeItem("authToken");
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
