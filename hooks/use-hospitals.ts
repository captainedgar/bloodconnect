import { useQuery } from "@tanstack/react-query";
import { getHospitals, getHospitalById } from "@/services/hospital-service";

export function useHospitals() {
  return useQuery({
    queryKey: ["hospitals"],
    queryFn: getHospitals,
  });
}

export function useHospital(id: string) {
  return useQuery({
    queryKey: ["hospital", id],
    queryFn: () => getHospitalById(id),
    enabled: !!id,
  });
}
