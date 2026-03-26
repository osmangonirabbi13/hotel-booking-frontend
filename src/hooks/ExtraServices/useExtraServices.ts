import { getExtraServices } from "@/services/extraServices.service";
import { useQuery } from "@tanstack/react-query";


export const useExtraServices = () => {
  return useQuery({
    queryKey: ["extra-services"],
    queryFn: getExtraServices,
  });
};