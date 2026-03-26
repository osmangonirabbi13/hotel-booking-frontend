/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteExtraService } from "@/services/extraServices.service";

export const useDeleteExtraService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteExtraService(id),

    onSuccess: () => {
      toast.success("Extra service deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["extra-services"] });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete extra service"
      );
    },
  });
};