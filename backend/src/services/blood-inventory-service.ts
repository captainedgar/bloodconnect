import { prisma } from "@/config/prisma";
import { BloodType } from "@prisma/client";
import type {
  BloodInventoryResponse,
  UpdateInventoryRequest,
} from "@/types";

export async function getInventoryByBloodBank(
  bloodBankId: string
): Promise<BloodInventoryResponse[]> {
  return prisma.bloodInventory.findMany({
    where: { bloodBankId },
    orderBy: { bloodType: "asc" },
  });
}

export async function getInventoryByBloodBankAndType(
  bloodBankId: string,
  bloodType: BloodType
): Promise<BloodInventoryResponse | null> {
  return prisma.bloodInventory.findUnique({
    where: {
      bloodBankId_bloodType: {
        bloodBankId,
        bloodType,
      },
    },
  });
}

export async function updateInventory(
  bloodBankId: string,
  bloodType: BloodType,
  data: UpdateInventoryRequest
): Promise<BloodInventoryResponse> {
  return prisma.bloodInventory.upsert({
    where: {
      bloodBankId_bloodType: {
        bloodBankId,
        bloodType,
      },
    },
    update: {
      units: data.units,
    },
    create: {
      bloodBankId,
      bloodType,
      units: data.units,
    },
  });
}

export async function getCriticalInventory(): Promise<
  Array<BloodInventoryResponse & { bloodBank: { id: string; name: string } }>
> {
  return prisma.bloodInventory.findMany({
    where: {
      units: {
        lt: 10,
      },
    },
    include: {
      bloodBank: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      units: "asc",
    },
  });
}
