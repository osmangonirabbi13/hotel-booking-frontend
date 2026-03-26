/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateExtraService } from "@/services/extraServices.service";
import { IUpdateExtraService } from "@/types/extraServices.types";

export const useUpdateExtraService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateExtraService;
    }) => updateExtraService(id, payload),

    onSuccess: () => {
      toast.success("Extra service updated successfully");
      queryClient.invalidateQueries({ queryKey: ["extra-services"] });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update extra service"
      );
    },
  });
};