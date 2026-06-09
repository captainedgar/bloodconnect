import { Request, Response, NextFunction } from "express";
import * as inventoryService from "@/services/blood-inventory-service";
import { BloodType } from "@prisma/client";

export async function getInventoryByBloodBank(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bloodBankId = req.params.bloodBankId as string;
    const inventory = await inventoryService.getInventoryByBloodBank(bloodBankId);
    res.json(inventory);
  } catch (error) {
    next(error);
  }
}

export async function updateInventory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bloodBankId = req.params.bloodBankId as string;
    const bloodType = req.params.bloodType as string;
    const inventory = await inventoryService.updateInventory(
      bloodBankId,
      bloodType as BloodType,
      req.body
    );
    res.json(inventory);
  } catch (error) {
    next(error);
  }
}

export async function getCriticalInventory(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const inventory = await inventoryService.getCriticalInventory();
    res.json(inventory);
  } catch (error) {
    next(error);
  }
}
