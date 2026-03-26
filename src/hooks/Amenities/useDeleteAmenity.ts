/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAmenity } from "@/app/(DashboardLayout)/admin/dashboard/amenities/_action";

export const useDeleteAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAmenity(id),

    onSuccess: () => {
      toast.success("Amenity deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete amenity");
    },
  });
};