/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { redirect } from "next/navigation";


export interface IChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

interface IChangePasswordResponse {
  success: boolean;
  message: string;
}

export const changePasswordAction = async (
  payload: IChangePasswordPayload
): Promise<IChangePasswordResponse | ApiErrorResponse> => {
  try {
    const response = await httpClient.post<IChangePasswordResponse>(
      "/auth/change-password",
      payload
    );

    

    
    redirect("/login?verified=true");

  } catch (error: any) {
   
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    return {
      success: false,
      message:
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Password change failed",
    };
  }
};