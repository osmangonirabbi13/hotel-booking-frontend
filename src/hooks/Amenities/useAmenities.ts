import { getAllAmenities } from "@/app/(DashboardLayout)/admin/dashboard/amenities/_action";
import { useQuery } from "@tanstack/react-query";


export const useAmenities = () => {
  return useQuery({
    queryKey: ["amenities"],
    queryFn: getAllAmenities,
  });
};