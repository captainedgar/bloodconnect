import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/services/auth-service";
import type { JwtPayload } from "@/types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Token de acceso requerido" });
      return;
    }

    const token = authHeader.substring(7);
    const payload = await verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
}
