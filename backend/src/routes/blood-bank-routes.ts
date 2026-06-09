import { Router } from "express";
import { z } from "zod";
import * as bloodBankController from "@/controllers/blood-bank-controller";
import { authMiddleware, requireRole } from "@/middlewares/auth";
import { validate } from "@/middlewares/validate";
import { UserRole } from "@prisma/client";

const router = Router();

const createBloodBankSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  hospitalId: z.string().uuid().optional(),
});

const updateBloodBankSchema = z.object({
  name: z.string().min(2).optional(),
  address: z.string().min(5).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  hospitalId: z.string().uuid().nullable().optional(),
  isActive: z.boolean().optional(),
});

router.get("/", bloodBankController.getAllBloodBanks);
router.get("/nearby", bloodBankController.getNearbyBloodBanks);
router.get("/:id", bloodBankController.getBloodBankById);

router.post(
  "/",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  validate(createBloodBankSchema),
  bloodBankController.createBloodBank
);

router.patch(
  "/:id",
  authMiddleware,
  requireRole(UserRole.ADMIN, UserRole.BLOOD_BANK),
  validate(updateBloodBankSchema),
  bloodBankController.updateBloodBank
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole(UserRole.ADMIN),
  bloodBankController.deleteBloodBank
);

export default router;
