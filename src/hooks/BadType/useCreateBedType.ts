/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBedType } from "@/services/bedType.service";
import { ICreateBedType } from "@/types/bedType.types";
import { toast } from "sonner";

export const useCreateBedType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateBedType) => createBedType(payload),

    onSuccess: () => {
      toast.success("Bed type created successfully");
      queryClient.invalidateQueries({ queryKey: ["bed-types"] });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to create bed type");
    },
  });
};