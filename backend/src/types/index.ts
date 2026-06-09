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

export interface HospitalResponse {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  email: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHospitalRequest {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
}

export interface UpdateHospitalRequest {
  name?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  isActive?: boolean;
}

export interface BloodBankResponse {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  email: string | null;
  hospitalId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BloodBankWithInventoryResponse extends BloodBankResponse {
  inventory: BloodInventoryResponse[];
}

export interface CreateBloodBankRequest {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  hospitalId?: string;
}

export interface UpdateBloodBankRequest {
  name?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  hospitalId?: string;
  isActive?: boolean;
}

export interface BloodInventoryResponse {
  id: string;
  bloodBankId: string;
  bloodType: BloodType;
  units: number;
  updatedAt: Date;
}

export interface UpdateInventoryRequest {
  units: number;
}

export interface NearbyQuery {
  latitude: string;
  longitude: string;
  radius?: string;
  bloodType?: BloodType;
}

export interface NearbyBloodBankResponse extends BloodBankWithInventoryResponse {
  distance: number;
}
