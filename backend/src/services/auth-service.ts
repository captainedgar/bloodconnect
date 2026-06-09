import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { prisma } from "@/config/prisma";
import { env } from "@/config/env";
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  UserResponse,
  JwtPayload,
} from "@/types";

const SALT_ROUNDS = 10;

function toUserResponse(user: {
  id: string;
  name: string;
  email: string;
  bloodType: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    bloodType: user.bloodType as UserResponse["bloodType"],
    role: user.role as UserResponse["role"],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function generateTokens(payload: JwtPayload) {
  const accessOptions: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };
  const refreshOptions: SignOptions = {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
  };

  const accessToken = jwt.sign(payload, env.JWT_SECRET, accessOptions);
  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, refreshOptions);

  return { accessToken, refreshToken };
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      bloodType: data.bloodType,
      role: data.role,
    },
  });

  const tokens = generateTokens({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    ...tokens,
    user: toUserResponse(user),
  };
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);

  if (!isValidPassword) {
    throw new Error("Credenciales inválidas");
  }

  const tokens = generateTokens({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    ...tokens,
    user: toUserResponse(user),
  };
}

export async function refreshToken(token: string): Promise<AuthResponse> {
  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      ...tokens,
      user: toUserResponse(user),
    };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Token de actualización inválido");
    }
    throw error;
  }
}

export async function verifyAccessToken(token: string): Promise<JwtPayload> {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Token de acceso inválido");
    }
    throw error;
  }
}
