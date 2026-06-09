import { Request, Response, NextFunction } from "express";
import * as userService from "@/services/user-service";

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(401).json({ message: "No autenticado" });
      return;
    }

    const user = await userService.getUserById(req.user.userId);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}
