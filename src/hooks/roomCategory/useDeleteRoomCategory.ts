/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteRoomCategory } from "@/services/roomCategory.service";

export const useDeleteRoomCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRoomCategory(id),

    onSuccess: () => {
      toast.success("Room category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["room-categories"] });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete room category"
      );
    },
  });
};