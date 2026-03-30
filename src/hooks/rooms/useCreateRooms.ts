import { createRoom } from "@/services/room.service";
import { ICreateRoomPayload } from "@/types/room.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateRooms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateRoomPayload | FormData) => createRoom(payload),

    onSuccess: () => {
      toast.success("Room created successfully ✅");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to create room");
    },
  });
};