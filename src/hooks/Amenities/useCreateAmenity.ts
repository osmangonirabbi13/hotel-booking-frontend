/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createAmenity } from "@/app/(DashboardLayout)/admin/dashboard/amenities/_action";
import { ICreateAmenity } from "@/types/amenity.types";

export const useCreateAmenity = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: ICreateAmenity) => createAmenity(payload),

    onSuccess: () => {
      toast.success("Amenity created successfully ✅");

      queryClient.invalidateQueries({
        queryKey: ["amenities"],
      });

      router.push("/admin/dashboard/amenities");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Amenity create failed ❌");
    },
  });
};