/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBedType } from "@/services/bedType.service";
import { toast } from "sonner";

export const useDeleteBedType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBedType(id),

    onSuccess: () => {
      toast.success("Bed type deleted");
      queryClient.invalidateQueries({ queryKey: ["bed-types"] });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Delete failed");
    },
  });
};