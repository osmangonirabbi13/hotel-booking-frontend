/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ICreateRoomPayload, IRoom, IRoomsResponse, IUpdateRoomPayload, } from "@/types/room.types";
import axios from "axios";

type DeleteRoomResponse = {
  success: boolean;
  message: string;
  data?: IRoom;
};

const getAxiosErrorMessage = (
  error: unknown,
  fallback = "Something went wrong"
): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | {
          message?: string;
          error?: string;
        }
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


export const getRooms = async (queryString?: string): Promise<IRoomsResponse> => {
  const res = await httpClient.get<IRoomsResponse>(
    queryString ? `/rooms?${queryString}` : "/rooms"
  );
  
  return (res as any) ?? (res as any).data; 
};


export const createRoom = async (roomData: ICreateRoomPayload | FormData) => {
  try {
    const room = await httpClient.post<IRoom>(`/rooms/create-room`, roomData);
    return room;
  } catch (error) {
    console.log("Error creating room:", error);
    throw error;
  }
};

export const getRoomById = async (id : string  ) => {
    try {
        const room = await httpClient.get<IRoom>(`/rooms/${id}`);
        return room;
    } catch (error) {
        console.log("Error fetching room:", error);
        throw error;
    }
}

export const deleteRoom = async (id: string): Promise<DeleteRoomResponse> => {
  try {
    const res = await httpClient.delete<IRoom>(`/rooms/${id}`);

    return {
      success: true,
      message: "Room deleted successfully",
      data: res.data,
    };
  } catch (error) {
    const message = getAxiosErrorMessage(error, "Failed to delete room");
    console.log("Error deleting room:", message);

    return {
      success: false,
      message,
    };
  }
};

export const updateRoom = async (
  id: string,
  roomData: IUpdateRoomPayload
): Promise<IRoom> => {
  try {
    const res = await httpClient.patch<IRoom>(`/rooms/${id}`, roomData);
    return res.data;
  } catch (error) {
    const message = getAxiosErrorMessage(error, "Failed to update room");
    console.log("Error updating room:", message);
    throw new Error(message);
  }
};