"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ICreateExtraService, IUpdateExtraService } from "@/types/extraServices.types";
import { IExtraService } from "@/types/room.types";


export const createExtraService = async (
  payload: ICreateExtraService
): Promise<IExtraService> => {
  try {
    const res = await httpClient.post<IExtraService>("/extra-services", payload);
    return res.data;
  } catch (error) {
    console.log("Error creating extra service:", error);
    throw error;
  }
};

export const getExtraServices = async () => {
    try {
        const res = await httpClient.get<IExtraService[]>("/extra-services");
        return res.data;

    } catch (error) {
        console.log("Error fetching extra services:", error);
        throw error;
    }
};

export const updateExtraService = async (
  id: string,
  payload: IUpdateExtraService
): Promise<IExtraService> => {
  try {
    const res = await httpClient.patch<IExtraService>(`/extra-services/${id}`, payload);
    return res.data;
  } catch (error) {
    console.log("Error updating extra service:", error);
    throw error;
  }
};

export const deleteExtraService = async (
  id: string
): Promise<IExtraService> => {
  try {
   const res = await httpClient.delete<IExtraService>(`/extra-services/${id}`);
   return res.data;
  } catch (error) {
    console.log("Error deleting extra service:", error);
    throw error;
  }
};