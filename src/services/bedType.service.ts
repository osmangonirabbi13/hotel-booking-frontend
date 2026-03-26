"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  ICreateBedType,
  IUpdateBedType,
  IBedType,
} from "@/types/bedType.types";


export const createBedType = async (
  payload: ICreateBedType
): Promise<IBedType> => {
  try {
    const res = await httpClient.post<IBedType>("/bed-types", payload);
    return res.data;
  } catch (error) {
    console.log("Error creating bed type:", error);
    throw error;
  }
};


export const getAllBedTypes = async (): Promise<IBedType[]> => {
  try {
    const res = await httpClient.get<IBedType[]>("/bed-types");
    return res.data;
  } catch (error) {
    console.log("Error fetching bed types:", error);
    throw error;
  }
};


export const deleteBedType = async (id: string) => {
  try {
    return await httpClient.delete<ICreateBedType[]>(`/bed-types/${id}`)
  } catch (error) {
    console.log("Error deleting bed type:", error)
    throw error
  }
}


export const updateBedType = async (
  id: string,
  payload: IUpdateBedType
): Promise<IBedType> => {
  try {
    const res = await httpClient.patch<IBedType>(
      `/bed-types/${id}`,
      payload
    );
    return res.data;
  } catch (error) {
    console.log("Error updating bed type:", error);
    throw error;
  }
};