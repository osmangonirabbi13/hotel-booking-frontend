/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { setTokenInCookies } from "@/lib/tokenUtils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getNewTokensWithRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    if (!res.ok) {
      return false;
    }

    const { data } = await res.json();

    const { accessToken, refreshToken: newRefreshToken, token } = data;

    if (accessToken) {
      await setTokenInCookies("accessToken", accessToken);
    }

    if (newRefreshToken) {
      await setTokenInCookies("refreshToken", newRefreshToken);
    }

    if (token) {
      await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
    }

    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

export async function getUserInfo() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!accessToken && !sessionToken) {
      return null;
    }

    const cookieHeader = [
      accessToken ? `accessToken=${accessToken}` : "",
      sessionToken ? `better-auth.session_token=${sessionToken}` : "",
    ]
      .filter(Boolean)
      .join("; ");

    const res = await fetch(`${BASE_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch user info:", res.status, res.statusText);
      return null;
    }

    const result = await res.json();
    return result?.data ?? null;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}


export async function changePassword(payload: { password: string }) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
      const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!accessToken && !sessionToken) {
      return null;
    }

    const cookieHeader = [
      accessToken ? `accessToken=${accessToken}` : "",
      sessionToken ? `better-auth.session_token=${sessionToken}` : "",
    ]
      .filter(Boolean)
      .join("; ");

    const res = await fetch(`${BASE_API_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Failed to change password:", res.status, res.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error changing password:", error);
    return false;
  }
}


export async function logoutUser() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    const cookieHeader = [
      accessToken ? `accessToken=${accessToken}` : "",
      sessionToken ? `better-auth.session_token=${sessionToken}` : "",
    ]
      .filter(Boolean)
      .join("; ");

    const res = await fetch(`${BASE_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader, // Authentication pathatei hobe
      },
    });

    if (!res.ok) {
      console.error("Failed to logout user:", res.status, res.statusText);
      return false;
    }

    // Server side theke cookie gulo delete kora
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("better-auth.session_token");

    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
}

export const updateMyProfile = async (formData: FormData) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    const cookieHeader = [
      accessToken ? `accessToken=${accessToken}` : "",
      sessionToken ? `better-auth.session_token=${sessionToken}` : "",
    ]
      .filter(Boolean)
      .join("; ");

    const res = await fetch(`${BASE_API_URL}/customers/update-my-profile`, {
      method: "PATCH",
      headers: {
        Cookie: cookieHeader,
        
      },
      body: formData,
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update profile");
    }

    revalidatePath("/profile");
    return await res.json();

  } catch (error) {
    console.log("Error updating profile:", error);
    throw error; 
  }
};