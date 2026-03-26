/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBedType } from "@/services/bedType.service";
import { toast } from "sonner";

export const useUpdateBedType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: any) =>
      updateBedType(id, payload),

    onSuccess: () => {
      toast.success("Bed type updated");
      queryClient.invalidateQueries({ queryKey: ["bed-types"] });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Update failed");
    },
  });
};