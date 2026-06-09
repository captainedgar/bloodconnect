import { Request, Response, NextFunction } from "express";
import * as authService from "@/services/auth-service";
import type { RegisterRequest, LoginRequest, RefreshTokenRequest } from "@/types";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data: RegisterRequest = req.body;
    const result = await authService.register(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data: LoginRequest = req.body;
    const result = await authService.login(data);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function refresh(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { refreshToken }: RefreshTokenRequest = req.body;
    const result = await authService.refreshToken(refreshToken);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
