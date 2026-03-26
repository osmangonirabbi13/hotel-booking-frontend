/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createRoomCategory } from "@/services/roomCategory.service";
import { ICreateRoomCategory } from "@/types/roomCategory.types";

export const useCreateRoomCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ICreateRoomCategory) => createRoomCategory(payload),

    onSuccess: () => {
      toast.success("Room category created successfully");
      queryClient.invalidateQueries({ queryKey: ["room-categories"] });

      setTimeout(() => {
        router.push("/admin/dashboard/room-category");
        router.refresh();
      }, 700);
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create room category"
      );
    },
  });
};