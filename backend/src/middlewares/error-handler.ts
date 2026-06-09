import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Error:", error.message);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
    });
    return;
  }

  if (error.message === "El email ya está registrado") {
    res.status(409).json({
      message: error.message,
      statusCode: 409,
    });
    return;
  }

  if (error.message === "Credenciales inválidas") {
    res.status(401).json({
      message: error.message,
      statusCode: 401,
    });
    return;
  }

  if (
    error.message.includes("Token") ||
    error.message.includes("inválido")
  ) {
    res.status(401).json({
      message: error.message,
      statusCode: 401,
    });
    return;
  }

  res.status(500).json({
    message: "Error interno del servidor",
    statusCode: 500,
  });
}
