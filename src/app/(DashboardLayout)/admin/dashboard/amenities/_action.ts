"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { ICreateAmenity } from "@/types/amenity.types"
import { IAmenity } from "@/types/room.types"

export const createAmenity = async (payload: ICreateAmenity) => {
  try {
    return await httpClient.post<ICreateAmenity[]>("/amenities", payload)
  } catch (error) {
    console.log("Error creating amenity:", error)
    throw error
  }
}

export const getAllAmenities = async () => {
  try {
    const response = await httpClient.get<IAmenity[]>("/amenities");
    return response.data;
  } catch (error) {
    console.log("Error fetching amenities:", error);
    throw error;
  }
};



export const updateAmenity = async (id: string, payload: ICreateAmenity) => {
  try {
    return await httpClient.patch<ICreateAmenity[]>(`/amenities/${id}`, payload)    
  } catch (error) {
    console.log("Error updating amenity:", error)
    throw error
  }
}

export const deleteAmenity = async (id: string) => {
  try {
    return await httpClient.delete<ICreateAmenity[]>(`/amenities/${id}`)
  } catch (error) {
    console.log("Error deleting amenity:", error)
    throw error
  }
}

