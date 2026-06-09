import { prisma } from "@/config/prisma";
import type {
  HospitalResponse,
  CreateHospitalRequest,
  UpdateHospitalRequest,
} from "@/types";

export async function getAllHospitals(): Promise<HospitalResponse[]> {
  return prisma.hospital.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });
}

export async function getHospitalById(
  id: string
): Promise<HospitalResponse | null> {
  return prisma.hospital.findUnique({
    where: { id },
  });
}

export async function createHospital(
  data: CreateHospitalRequest
): Promise<HospitalResponse> {
  return prisma.hospital.create({
    data,
  });
}

export async function updateHospital(
  id: string,
  data: UpdateHospitalRequest
): Promise<HospitalResponse> {
  return prisma.hospital.update({
    where: { id },
    data,
  });
}

export async function deleteHospital(id: string): Promise<void> {
  await prisma.hospital.delete({
    where: { id },
  });
}
