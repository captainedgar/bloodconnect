import { Request, Response, NextFunction } from "express";
import * as hospitalService from "@/services/hospital-service";

export async function getAllHospitals(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hospitals = await hospitalService.getAllHospitals();
    res.json(hospitals);
  } catch (error) {
    next(error);
  }
}

export async function getHospitalById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id as string;
    const hospital = await hospitalService.getHospitalById(id);
    if (!hospital) {
      res.status(404).json({ message: "Hospital no encontrado" });
      return;
    }
    res.json(hospital);
  } catch (error) {
    next(error);
  }
}

export async function createHospital(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hospital = await hospitalService.createHospital(req.body);
    res.status(201).json(hospital);
  } catch (error) {
    next(error);
  }
}

export async function updateHospital(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id as string;
    const hospital = await hospitalService.updateHospital(id, req.body);
    res.json(hospital);
  } catch (error) {
    next(error);
  }
}

export async function deleteHospital(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id as string;
    await hospitalService.deleteHospital(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
