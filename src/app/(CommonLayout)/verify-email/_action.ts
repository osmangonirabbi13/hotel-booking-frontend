/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { redirect } from "next/navigation";

interface IVerifyPayload {
  email: string;
  otp: string;
}

interface IVerifyResponse {
  success: boolean;
  message: string;
}

export const verifyEmailAction = async (
  payload: IVerifyPayload
): Promise<IVerifyResponse | ApiErrorResponse> => {
  try {
    const response = await httpClient.post<IVerifyResponse>(
      "/auth/verify-email",
      payload
    );

    console.log(response.data);

    // verify success → login page
    redirect("/login?verified=true");

  } catch (error: any) {
    // Next redirect error ignore
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
        "OTP verification failed",
    };
  }
};