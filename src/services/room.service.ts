import { httpClient } from "@/lib/axios/httpClient";
import { ICreateRoomPayload, IRoom } from "@/types/room.types";

export const getRooms = async (queryString : string) => {
    try {
        const rooms = await httpClient.get<IRoom[]>(queryString ? `/rooms?${queryString}` : "/rooms");
        return rooms;
    } catch (error) {
        console.log("Error fetching rooms:", error);
        throw error;
    }
}

export const createRoom = async (roomData : ICreateRoomPayload) => {
    try {
        const room = await httpClient.post<IRoom>(`/rooms/create-room`, roomData);
        return room;
    } catch (error) {
        console.log("Error creating room:", error);
        throw error;
    }
}

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