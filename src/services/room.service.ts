/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ICreateRoomPayload, IRoom, IRoomsResponse, } from "@/types/room.types";




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

export const updateRoom = async (id : string, roomData : ICreateRoomPayload) => {
    try {
        const room = await httpClient.patch<IRoom>(`/rooms/${id}`, roomData);
        return room;
    } catch (error) {
        console.log("Error updating room:", error);
        throw error;
    }
}


export const deleteRoom = async (id : string) => {
    try {
        const room = await httpClient.delete<IRoom>(`/rooms/${id}`);
        return room;
    } catch (error) {
        console.log("Error deleting room:", error);
        throw error;
    }
}   