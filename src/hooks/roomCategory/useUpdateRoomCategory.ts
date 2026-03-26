/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateRoomCategory } from "@/services/roomCategory.service";
import { IUpdateRoomCategory } from "@/types/roomCategory.types";

export const useUpdateRoomCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateRoomCategory;
    }) => updateRoomCategory(id, payload),

    onSuccess: () => {
      toast.success("Room category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["room-categories"] });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update room category"
      );
    },
  });
};