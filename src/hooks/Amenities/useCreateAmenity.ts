/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createAmenity } from "@/app/(DashboardLayout)/admin/dashboard/amenities/_action";
import { ICreateAmenity } from "@/types/amenity.types";

export const useCreateAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateAmenity) => createAmenity(payload),

    onSuccess: () => {
      toast.success("Amenity created successfully ✅");

      queryClient.invalidateQueries({
        queryKey: ["amenities"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Amenity create failed ❌");
    },
  });
};