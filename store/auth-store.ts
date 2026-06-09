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
      console.log("[Auth] Loading session...");
      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();

      if (!accessToken || !refreshToken) {
        console.log("[Auth] No tokens found, marking as initialized");
        set({ isInitialized: true });
        return;
      }

      console.log("[Auth] Tokens found, fetching user...");
      const user = await getMeApi();
      console.log("[Auth] User loaded:", user.email);
      set({
        user,
        tokens: { accessToken, refreshToken },
        isAuthenticated: true,
        isInitialized: true,
      });
    } catch (error) {
      console.log("[Auth] Session load failed:", error);
      await clearTokens();
      set({ isInitialized: true });
    }
  },
}));
