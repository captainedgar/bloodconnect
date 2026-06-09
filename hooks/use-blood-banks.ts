import { useQuery } from "@tanstack/react-query";
import { getBloodBanks, getBloodBankById, getNearbyBloodBanks } from "@/services/blood-bank-service";
import type { NearbyQuery } from "@/types";

export function useBloodBanks() {
  return useQuery({
    queryKey: ["bloodBanks"],
    queryFn: getBloodBanks,
  });
}

export function useBloodBank(id: string) {
  return useQuery({
    queryKey: ["bloodBank", id],
    queryFn: () => getBloodBankById(id),
    enabled: !!id,
  });
}

export function useNearbyBloodBanks(query: NearbyQuery | null) {
  return useQuery({
    queryKey: ["nearbyBloodBanks", query],
    queryFn: () => getNearbyBloodBanks(query!),
    enabled: !!query,
  });
}
