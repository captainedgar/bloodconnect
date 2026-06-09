import { api } from "./api";
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "@/types";

export async function loginApi(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
}

export async function registerApi(data: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/register", data);
  return response.data;
}

export async function getMeApi(): Promise<User> {
  const response = await api.get<User>("/users/me");
  return response.data;
}

export async function refreshTokenApi(refreshToken: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/refresh", { refreshToken });
  return response.data;
}
