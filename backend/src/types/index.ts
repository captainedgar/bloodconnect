import { BloodType, UserRole } from "@prisma/client";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  bloodType: BloodType;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  bloodType: BloodType;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
