import { create } from "zustand";
import { authApi } from "../api/authApi";

/**
 * useAuth store and hook using Zustand to manage authentication state.
 */
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  login: async (email, password) => {
    set({ loading: true });
    try {
      const response = await authApi.login(email, password);
      set({ user: response.user, token: response.token, loading: false });
      return response;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  logout: () => set({ user: null, token: null }),
  signup: async (name, email, password, role) => {
    set({ loading: true });
    try {
      const response = await authApi.signup(name, email, password, role);
      set({ user: response.user, token: response.token, loading: false });
      return response;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));

/**
 * Custom hook wrapper for authentication state and actions.
 */
export const useAuth = () => {
  const { user, token, loading, login, logout, signup } = useAuthStore();
  return { user, token, loading, login, logout, signup };
};
