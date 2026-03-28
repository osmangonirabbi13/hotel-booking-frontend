import { ApiResponse } from "@/types/api.types";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined in environment variables");
}

// Browser-safe axios instance — uses withCredentials so the browser
// automatically attaches httpOnly cookies (accessToken, refreshToken, etc.)
// to every request. Do NOT use next/headers here (server-only).
const browserAxios = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ApiRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

const browserGet = async <TData>(
  endpoint: string,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  const response = await browserAxios.get<ApiResponse<TData>>(endpoint, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

const browserPost = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  const response = await browserAxios.post<ApiResponse<TData>>(endpoint, data, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

const browserPut = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  const response = await browserAxios.put<ApiResponse<TData>>(endpoint, data, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

const browserPatch = async <TData>(
  endpoint: string,
  data: unknown,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  const response = await browserAxios.patch<ApiResponse<TData>>(endpoint, data, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

const browserDelete = async <TData>(
  endpoint: string,
  options?: ApiRequestOptions,
): Promise<ApiResponse<TData>> => {
  const response = await browserAxios.delete<ApiResponse<TData>>(endpoint, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

export const httpClientBrowser = {
  get: browserGet,
  post: browserPost,
  put: browserPut,
  patch: browserPatch,
  delete: browserDelete,
};
