/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ICreateAmenity } from "@/types/amenity.types";
import { toast } from "sonner";
import { updateAmenity } from "@/app/(DashboardLayout)/admin/dashboard/amenities/_action";

export const useUpdateAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ICreateAmenity }) =>
      updateAmenity(id, payload),

    onSuccess: () => {
      toast.success("Amenity updated successfully");
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update amenity");
    },
  });
};