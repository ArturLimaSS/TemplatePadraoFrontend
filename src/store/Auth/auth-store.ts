import { api } from "src/constants/endpoints";
import type { loginFormType } from "src/types/auth/auth";
import { create } from "zustand";

export const useAuthStore = create((set, _) => ({
  isAuthLoading: false,
  isAuthenticated: false,
  login: async (payload: loginFormType) => {
    set({ isAuthLoading: true })
    try {
      const response = await api.post("/v1/auth/login", payload);
      set({ isAuthLoading: false, isAuthenticated: true })
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
      return response;

    } catch (error) {

      set({ isAuthLoading: false, isAuthenticated: false })
    }
  }
}))