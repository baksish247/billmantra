// src/app/redux/contexts/AuthProvider.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  logout,
  selectAuthToken,
  selectAuthUser,
  selectIsAuthenticated,
} from "../slices/authSlice";
import { RootState } from "../store";
import { DecodedToken } from "../slices/authSlice";

interface AuthContextType {
  token: string | null;
  user: DecodedToken | null;
  isAuthenticated: boolean;
  loginUser: (token: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => selectAuthToken(state));
  const user = useSelector((state: RootState) => selectAuthUser(state));
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsAuthenticated(state)
  );

  const loginUser = (token: string) => dispatch(login(token));
  const logoutUser = () => dispatch(logout());

  const value: AuthContextType = {
    token,
    user,
    isAuthenticated,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
