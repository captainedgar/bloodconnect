export enum BloodType {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
}

export enum UserRole {
  DONOR = "donor",
  RECIPIENT = "recipient",
  MEDICAL = "medical",
  ADMIN = "admin",
}

export enum Sex {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  sex: Sex;
  bloodType: BloodType;
  weight: number;
  city: string;
  province: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
