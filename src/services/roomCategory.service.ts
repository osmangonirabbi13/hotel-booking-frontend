"use server"


import { httpClient } from "@/lib/axios/httpClient";
import { ICreateRoomCategory, IRoomCategory, IUpdateRoomCategory } from "@/types/roomCategory.types";

export const createRoomCategory = async (
  payload: ICreateRoomCategory
): Promise<IRoomCategory> => {
  try {
    const res = await httpClient.post<IRoomCategory>("/room-categories", payload);
    return res.data;
  } catch (error) {
    console.log("Error creating room category:", error);
    throw error;
  }
};

export const getAllRoomCategories = async (): Promise<IRoomCategory[]> => {
  try {
    const res = await httpClient.get<IRoomCategory[]>("/room-categories");
    return res.data;
  } catch (error) {
    console.log("Error fetching room categories:", error);
    throw error;
  }
};

export const updateRoomCategory = async (
  id: string,
  payload: IUpdateRoomCategory
): Promise<IRoomCategory> => {
  try {
    const res = await httpClient.patch<IRoomCategory>(`/room-categories/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log("Error updating room category:", error);
    throw error;
  }
};

export const deleteRoomCategory = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await httpClient.delete<{ success: boolean; message: string }>(
      `/room-categories/${id}`
    );
    return res.data;
  } catch (error) {
    console.log("Error deleting room category:", error);
    throw error;
  }
};