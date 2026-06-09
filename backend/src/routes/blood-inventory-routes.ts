import { Router } from "express";
import { z } from "zod";
import * as inventoryController from "@/controllers/blood-inventory-controller";
import { authMiddleware, requireRole } from "@/middlewares/auth";
import { validate } from "@/middlewares/validate";
import { UserRole } from "@prisma/client";

const router = Router();

const updateInventorySchema = z.object({
  units: z.number().int().min(0, "Las unidades no pueden ser negativas"),
});

router.get("/critical", inventoryController.getCriticalInventory);

router.get(
  "/:bloodBankId",
  inventoryController.getInventoryByBloodBank
);

router.patch(
  "/:bloodBankId/:bloodType",
  authMiddleware,
  requireRole(UserRole.ADMIN, UserRole.BLOOD_BANK),
  validate(updateInventorySchema),
  inventoryController.updateInventory
);

export default router;
