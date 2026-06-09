import { api } from "./api";
import type { BloodBankWithInventory, NearbyBloodBank, NearbyQuery } from "@/types";

export async function getBloodBanks(): Promise<BloodBankWithInventory[]> {
  const response = await api.get<BloodBankWithInventory[]>("/blood-banks");
  return response.data;
}

export async function getBloodBankById(id: string): Promise<BloodBankWithInventory> {
  const response = await api.get<BloodBankWithInventory>(`/blood-banks/${id}`);
  return response.data;
}

export async function getNearbyBloodBanks(query: NearbyQuery): Promise<NearbyBloodBank[]> {
  const params = new URLSearchParams({
    latitude: query.latitude.toString(),
    longitude: query.longitude.toString(),
  });

  if (query.radius) {
    params.append("radius", query.radius.toString());
  }

  if (query.bloodType) {
    params.append("bloodType", query.bloodType);
  }

  const response = await api.get<NearbyBloodBank[]>(`/blood-banks/nearby?${params.toString()}`);
  return response.data;
}
