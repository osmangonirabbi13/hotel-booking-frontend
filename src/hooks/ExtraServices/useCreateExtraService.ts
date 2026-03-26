/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createExtraService } from "@/services/extraServices.service";
import { ICreateExtraService } from "@/types/extraServices.types";

export const useCreateExtraService = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ICreateExtraService) => createExtraService(payload),

    onSuccess: () => {
      toast.success("Extra service created successfully");
      queryClient.invalidateQueries({ queryKey: ["extra-services"] });

      setTimeout(() => {
        router.push("/admin/dashboard/extra-services");
        router.refresh();
      }, 700);
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create extra service"
      );
    },
  });
};