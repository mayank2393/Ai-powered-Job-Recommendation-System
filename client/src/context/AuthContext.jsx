import React, { createContext, useContext } from "react";
import { useAuthStore } from "../hooks/useAuth";

const AuthContext = createContext(null);

/**
 * AuthProvider component provides auth store context via Zustand hook.
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuthStore();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

/**
 * useAuthContext hook for consuming auth data from context.
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
