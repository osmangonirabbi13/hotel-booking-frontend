import { useQuery } from "@tanstack/react-query";
import { getAllBedTypes } from "@/services/bedType.service";

export const useBedTypes = () => {
  return useQuery({
    queryKey: ["bed-types"],
    queryFn: getAllBedTypes,
  });
};