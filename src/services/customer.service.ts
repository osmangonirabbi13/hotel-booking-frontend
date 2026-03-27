"use server"

import { httpClient } from "@/lib/axios/httpClient";
import { ICustomer, Role, UserStatus } from "@/types/customer.types";


export const getCustomerById = async (id: string): Promise<ICustomer> => {
  try {
    const res = await httpClient.get<ICustomer>(`/admins/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching customer:", error);
    throw error;
  }
};  

export const getAllCustomers = async (): Promise<ICustomer[]> => {
  try {
    const res = await httpClient.get<ICustomer[]>("/admins");
    return res.data;
  } catch (error) {
    console.log("Error fetching customers:", error);
    throw error;
  }
};

// STATUS UPDATE FIX
export const changeUserStatus = async (userId: string, userStatus: UserStatus) => {
  // Router e path holo "/change-user-status/:id"
  // Tai URL e userId pathate hobe
  const res = await httpClient.patch(`/admins/change-user-status`, { 
    userId,
    userStatus // Backend controller e 'userStatus' key ta check korun
  });
  return res.data;
};

// ROLE UPDATE FIX
export const changeUserRole = async (userId: string, role: Role) => {
  // Router e path holo "/change-user-role/:id"
  const res = await httpClient.patch(`/admins/change-user-role`, { 
    userId,
    role
  });
  return res.data;
};


