import { Router } from "express";
import { z } from "zod";
import * as authController from "@/controllers/auth-controller";
import { validate } from "@/middlewares/validate";

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  bloodType: z.enum([
    "A_POSITIVE",
    "A_NEGATIVE",
    "B_POSITIVE",
    "B_NEGATIVE",
    "AB_POSITIVE",
    "AB_NEGATIVE",
    "O_POSITIVE",
    "O_NEGATIVE",
  ]),
  role: z.enum(["DONOR", "RECIPIENT", "HOSPITAL", "BLOOD_BANK", "ADMIN"]).default("DONOR"),
});

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Token requerido"),
});

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh", validate(refreshSchema), authController.refresh);

export default router;
