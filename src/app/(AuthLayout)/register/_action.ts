/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiErrorResponse } from "@/types/api.types";
import { IRegisterResponse } from "@/types/auth.types";
import { IRegisterPayload, registerZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export const registerAction = async (
    payload: IRegisterPayload,
): Promise<IRegisterResponse | ApiErrorResponse> => {
    const parsedPayload = registerZodSchema.safeParse(payload);

    if (!parsedPayload.success) {
        const firstError = parsedPayload.error.issues[0].message || "Invalid input";
        return {
            success: false,
            message: firstError,
        };
    }

    const { confirmPassword: _ , ...registerData } = parsedPayload.data;

    try {
        const response = await httpClient.post<IRegisterResponse>(
            "/auth/register",
            registerData,
        );

        console.log(response.data);

        redirect("/login?registered=true");

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
                "Registration failed",
        };
    }
};