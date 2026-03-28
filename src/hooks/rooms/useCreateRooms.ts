/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IRoom } from "@/types/room.types";
import { createRoom } from "@/services/room.service";

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: IRoom) => createRoom(payload),

    onSuccess: () => {
      toast.success("Room created successfully ✅");

      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });

      router.push("/admin/dashboard/rooms");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Room create failed ❌");
    },
  });
};