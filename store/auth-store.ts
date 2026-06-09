import { create } from "zustand";
import type { User, AuthTokens, LoginRequest, RegisterRequest } from "@/types";
import { loginApi, registerApi, getMeApi } from "@/services/auth-service";
import { saveTokens, getAccessToken, getRefreshToken, clearTokens } from "@/services/secure-store";

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  loadSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,

  login: async (data) => {
    set({ isLoading: true });
    try {
      const response = await loginApi(data);
      await saveTokens(response.accessToken, response.refreshToken);
      set({
        user: response.user,
        tokens: { accessToken: response.accessToken, refreshToken: response.refreshToken },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data) => {
    set({ isLoading: true });
    try {
      const response = await registerApi(data);
      await saveTokens(response.accessToken, response.refreshToken);
      set({
        user: response.user,
        tokens: { accessToken: response.accessToken, refreshToken: response.refreshToken },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await clearTokens();
    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
    });
  },

  loadSession: async () => {
    try {
      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();

      if (!accessToken || !refreshToken) {
        set({ isInitialized: true });
        return;
      }

      const user = await getMeApi();
      set({
        user,
        tokens: { accessToken, refreshToken },
        isAuthenticated: true,
        isInitialized: true,
      });
    } catch {
      await clearTokens();
      set({ isInitialized: true });
    }
  },
}));
