import { Request, Response, NextFunction } from "express";
import * as bloodBankService from "@/services/blood-bank-service";
import { BloodType } from "@prisma/client";

export async function getAllBloodBanks(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bloodBanks = await bloodBankService.getAllBloodBanks();
    res.json(bloodBanks);
  } catch (error) {
    next(error);
  }
}

export async function getBloodBankById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id as string;
    const bloodBank = await bloodBankService.getBloodBankById(id);
    if (!bloodBank) {
      res.status(404).json({ message: "Banco de sangre no encontrado" });
      return;
    }
    res.json(bloodBank);
  } catch (error) {
    next(error);
  }
}

export async function getNearbyBloodBanks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { latitude, longitude, radius, bloodType } = req.query;

    if (!latitude || !longitude) {
      res.status(400).json({
        message: "Los parámetros latitude y longitude son requeridos",
      });
      return;
    }

    const lat = parseFloat(latitude as string);
    const lng = parseFloat(longitude as string);
    const radiusKm = radius ? parseFloat(radius as string) : 50;
    const bloodTypeFilter = bloodType
      ? (bloodType as BloodType)
      : undefined;

    if (isNaN(lat) || isNaN(lng)) {
      res.status(400).json({
        message: "Los parámetros latitude y longitude deben ser números válidos",
      });
      return;
    }

    const bloodBanks = await bloodBankService.getNearbyBloodBanks(
      lat,
      lng,
      radiusKm,
      bloodTypeFilter
    );
    res.json(bloodBanks);
  } catch (error) {
    next(error);
  }
}

export async function createBloodBank(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bloodBank = await bloodBankService.createBloodBank(req.body);
    res.status(201).json(bloodBank);
  } catch (error) {
    next(error);
  }
}

export async function updateBloodBank(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id as string;
    const bloodBank = await bloodBankService.updateBloodBank(id, req.body);
    res.json(bloodBank);
  } catch (error) {
    next(error);
  }
}

export async function deleteBloodBank(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id as string;
    await bloodBankService.deleteBloodBank(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
