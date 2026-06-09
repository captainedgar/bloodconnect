export enum BloodType {
  A_POSITIVE = "A_POSITIVE",
  A_NEGATIVE = "A_NEGATIVE",
  B_POSITIVE = "B_POSITIVE",
  B_NEGATIVE = "B_NEGATIVE",
  AB_POSITIVE = "AB_POSITIVE",
  AB_NEGATIVE = "AB_NEGATIVE",
  O_POSITIVE = "O_POSITIVE",
  O_NEGATIVE = "O_NEGATIVE",
}

export const BLOOD_TYPE_LABELS: Record<BloodType, string> = {
  [BloodType.A_POSITIVE]: "A+",
  [BloodType.A_NEGATIVE]: "A-",
  [BloodType.B_POSITIVE]: "B+",
  [BloodType.B_NEGATIVE]: "B-",
  [BloodType.AB_POSITIVE]: "AB+",
  [BloodType.AB_NEGATIVE]: "AB-",
  [BloodType.O_POSITIVE]: "O+",
  [BloodType.O_NEGATIVE]: "O-",
};

export enum UserRole {
  DONOR = "DONOR",
  RECIPIENT = "RECIPIENT",
  HOSPITAL = "HOSPITAL",
  BLOOD_BANK = "BLOOD_BANK",
  ADMIN = "ADMIN",
}

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.DONOR]: "Donante",
  [UserRole.RECIPIENT]: "Receptor",
  [UserRole.HOSPITAL]: "Hospital",
  [UserRole.BLOOD_BANK]: "Banco de Sangre",
  [UserRole.ADMIN]: "Administrador",
};

export interface User {
  id: string;
  name: string;
  email: string;
  bloodType: BloodType;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  bloodType: BloodType;
  role: UserRole;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: { field: string; message: string }[];
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  email: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BloodBank {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  email: string | null;
  hospitalId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BloodInventory {
  id: string;
  bloodBankId: string;
  bloodType: BloodType;
  units: number;
  updatedAt: string;
}

export interface BloodBankWithInventory extends BloodBank {
  inventory: BloodInventory[];
}

export interface NearbyBloodBank extends BloodBankWithInventory {
  distance: number;
}

export interface NearbyQuery {
  latitude: number;
  longitude: number;
  radius?: number;
  bloodType?: BloodType;
}
