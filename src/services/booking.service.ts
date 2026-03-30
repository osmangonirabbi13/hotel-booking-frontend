/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import {
  IApiResponse,
  IBooking,
  IBookingResponse,
  IChangeBookingStatusPayload,
  IBookBookingPayload,
  IBookingListData,
} from "@/types/booking.types";
import axios from "axios";



const getAxiosErrorMessage = (
  error: unknown,
  fallback = "Something went wrong"
): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; error?: string }
      | string
      | undefined;

    if (typeof data === "string") return data;
    if (typeof data?.error === "string") return data.error;
    if (typeof data?.message === "string") return data.message;

    return error.message || fallback;
  }

  if (error instanceof Error) return error.message;
  return fallback;
};



export const createBooking = async (payload: IBookBookingPayload) => {
  try {
    const res = await httpClient.post<IApiResponse<IBookingResponse>>(
      "/bookings",
      payload
    );

    const responseData = res.data as any; 

    return {
      success: responseData.success ?? true, 
      message: responseData.message || "Booking created",
      paymentUrl: responseData.paymentUrl || null,
      booking: responseData.booking || null,
      payment: responseData.payment || null,
    };
  } catch (error: any) {
    console.error("Service Error:", error);
    throw error;
  }
};

export const getAllBookings = async (): Promise<IBooking[]> => {
  const res = await httpClient.get<ApiResponse<IBooking[]>>("/bookings");
  return res.data.data;
};

export const getMyBookings = async (): Promise<IBookingListData> => {
  try {
    const res = await httpClient.get<IApiResponse<IBookingListData>>(
      "/bookings/my-bookings"
    );
    
    return res.data.data; 
  } catch (error) {
    const message = getAxiosErrorMessage(error, "Failed to fetch bookings");
    throw new Error(message);
  }
};

export const getMySingleBooking = async (id: string): Promise<any> => {
  try {
   
    const res = await httpClient.get(`/bookings/my-bookings/${id}`);
    
    return res.data;
  } catch (error: any) {
    
    const message = error.response?.data?.message || "Booking not found or access denied";
    throw new Error(message);
  }
};

export const changeBookingStatus = async (
  id: string,
  payload: IChangeBookingStatusPayload
): Promise<IBooking> => {
  try {
    const res = await httpClient.patch<IBooking>(
      `/bookings/${id}/status`,
      payload
    );
    return res.data;
  } catch (error) {
    console.log("Error updating booking status:", error);
    throw error;
  }
};

export const initiateBookingPayment = async (
  id: string , payload: IChangeBookingStatusPayload
): Promise<IBooking> => {
  try {
    const res = await httpClient.post<IBooking>(
      `/bookings/initiate-payment/${id}`,
      payload
    );
    return res.data;
  } catch (error) {
    console.log("Error initiating payment:", error);
    throw error;
  }
};

export const deleteBooking = async (id: string): Promise<IBooking> => {
  try {
    const res = await httpClient.delete<IBooking>(`/bookings/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error deleting booking:", error);
    throw error;
  }
};  