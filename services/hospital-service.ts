import { api } from "./api";
import type { Hospital } from "@/types";

export async function getHospitals(): Promise<Hospital[]> {
  const response = await api.get<Hospital[]>("/hospitals");
  return response.data;
}

export async function getHospitalById(id: string): Promise<Hospital> {
  const response = await api.get<Hospital>(`/hospitals/${id}`);
  return response.data;
}
