"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { CartProvider } from "./CartProvider";
import { AuthProvider } from "./AuthProvider";

interface ReduxProviderProps {
  children: ReactNode;
}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait until component is mounted before rendering children to prevent hydration issues
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <Provider store={store}>
      <CartProvider>
        <AuthProvider>{isHydrated ? children : null}</AuthProvider>
      </CartProvider>
    </Provider>
  );
};
