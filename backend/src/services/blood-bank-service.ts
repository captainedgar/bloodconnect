import { prisma } from "@/config/prisma";
import { BloodType } from "@prisma/client";
import type {
  BloodBankResponse,
  BloodBankWithInventoryResponse,
  CreateBloodBankRequest,
  UpdateBloodBankRequest,
  NearbyBloodBankResponse,
} from "@/types";

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export async function getAllBloodBanks(): Promise<
  BloodBankWithInventoryResponse[]
> {
  return prisma.bloodBank.findMany({
    where: { isActive: true },
    include: {
      inventory: true,
    },
    orderBy: { name: "asc" },
  });
}

export async function getBloodBankById(
  id: string
): Promise<BloodBankWithInventoryResponse | null> {
  return prisma.bloodBank.findUnique({
    where: { id },
    include: {
      inventory: true,
    },
  });
}

export async function getNearbyBloodBanks(
  latitude: number,
  longitude: number,
  radiusKm: number = 50,
  bloodType?: BloodType
): Promise<NearbyBloodBankResponse[]> {
  const bloodBanks = await prisma.bloodBank.findMany({
    where: { isActive: true },
    include: {
      inventory: true,
    },
  });

  const withDistance = bloodBanks.map((bank) => ({
    ...bank,
    distance: calculateDistance(
      latitude,
      longitude,
      bank.latitude,
      bank.longitude
    ),
  }));

  const filtered = withDistance.filter((bank) => bank.distance <= radiusKm);

  const sorted = filtered.sort((a, b) => a.distance - b.distance);

  if (bloodType) {
    return sorted.filter((bank) =>
      bank.inventory.some((inv) => inv.bloodType === bloodType && inv.units > 0)
    );
  }

  return sorted;
}

export async function createBloodBank(
  data: CreateBloodBankRequest
): Promise<BloodBankResponse> {
  return prisma.bloodBank.create({
    data,
  });
}

export async function updateBloodBank(
  id: string,
  data: UpdateBloodBankRequest
): Promise<BloodBankResponse> {
  return prisma.bloodBank.update({
    where: { id },
    data,
  });
}

export async function deleteBloodBank(id: string): Promise<void> {
  await prisma.bloodBank.delete({
    where: { id },
  });
}
