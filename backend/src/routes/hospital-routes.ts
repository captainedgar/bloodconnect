import { Router } from "express";
import { z } from "zod";
import * as hospitalController from "@/controllers/hospital-controller";
import { authMiddleware, requireRole } from "@/middlewares/auth";
import { validate } from "@/middlewares/validate";
import { UserRole } from "@prisma/client";

const router = Router();

const createHospitalSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
});

const updateHospitalSchema = z.object({
  name: z.string().min(2).optional(),
  address: z.string().min(5).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
});

router.get("/", hospitalController.getAllHospitals);
router.get("/:id", hospitalController.getHospitalById);

router.post(
  "/",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate(createHospitalSchema),
  hospitalController.createHospital
);

router.patch(
  "/:id",
  authMiddleware,
  requireRole(UserRole.ADMIN, UserRole.HOSPITAL),
  validate(updateHospitalSchema),
  hospitalController.updateHospital
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  hospitalController.deleteHospital
);

export default router;
