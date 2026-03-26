import { httpClient } from "@/lib/axios/httpClient";
import { IRoom } from "@/types/room.types";

export const getRooms = async (queryString : string) => {
    try {
        const rooms = await httpClient.get<IRoom[]>(queryString ? `/rooms?${queryString}` : "/rooms");
        return rooms;
    } catch (error) {
        console.log("Error fetching rooms:", error);
        throw error;
    }
}