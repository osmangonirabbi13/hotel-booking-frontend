"use server"

import { httpClient } from "@/lib/axios/httpClient";
import {
  IBooking,
  IChangeBookingStatusPayload,
  ICreateBookingPayload,
} from "@/types/booking.types";

export const createBooking = async (
  payload: ICreateBookingPayload
): Promise<IBooking> => {
  try {
    const res = await httpClient.post<IBooking>("/bookings", payload);
    return res.data;
  } catch (error) {
    console.log("Error creating booking:", error);
    throw error;
  }
};

export const getAllBookings = async (): Promise<IBooking[]> => {
  try {
    const res = await httpClient.get<IBooking[]>("/bookings");
    return res.data?.data || [];
  } catch (error) {
    console.log("Error fetching bookings:", error);
    throw error;
  }
};

export const getMySingleBooking = async (id: string): Promise<IBooking> => {
  try {
    const res = await httpClient.get<IBooking>(`/bookings/my-bookings/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching booking:", error);
    throw error;
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