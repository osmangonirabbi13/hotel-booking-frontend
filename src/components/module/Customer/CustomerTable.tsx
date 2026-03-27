/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Role, UserStatus, ICustomer } from "@/types/customer.types";
import Swal from "sweetalert2";
import { Edit, ShieldCheck, User, RefreshCw } from "lucide-react";
import { changeUserRole, changeUserStatus, getAllCustomers } from "@/services/customer.service";

const CustomerTable = () => {
  const queryClient = useQueryClient();

  // 1. Fetch Data
  const { data: customers, isLoading, isError } = useQuery<any[]>({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });

  // 2. Status Change Mutation
  const statusMutation = useMutation({
    mutationFn: (payload: { userId: string; userStatus: UserStatus }) =>
      changeUserStatus(payload.userId, payload.userStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      Swal.fire({ 
        title: "Success!", 
        text: "Status updated.", 
        icon: "success", 
        timer: 1500, 
        showConfirmButton: false 
      });
    },
    onError: (error: any) => {
      Swal.fire("Error", error?.response?.data?.message || "Internal Server Error", "error");
    },
  });

  // 3. Role Change Mutation
  const roleMutation = useMutation({
    mutationFn: (payload: { userId: string; role: Role }) =>
      changeUserRole(payload.userId, payload.role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      Swal.fire("Updated!", "Role has been changed.", "success");
    },
  });

  // --- Handlers ---
  const handleStatusChange = (userData: any) => {
    Swal.fire({
      title: `Update Status for ${userData.name}`,
      input: "select",
      inputOptions: { ACTIVE: "ACTIVE", BLOCKED: "BLOCKED", DELETED: "DELETED" },
      inputValue: userData.status,
      showCancelButton: true,
      confirmButtonText: "Update Status",
    }).then((result) => {
      if (result.isConfirmed) {
        statusMutation.mutate({ 
          userId: userData.id, 
          userStatus: result.value as UserStatus 
        });
      }
    });
  };

  const handleEditRole = (userData: any) => {
    Swal.fire({
      title: `Change Role for ${userData.name}`,
      input: "select",
      inputOptions: { ADMIN: "ADMIN", CUSTOMER: "CUSTOMER" },
      inputValue: userData.role,
      showCancelButton: true,
      confirmButtonText: "Change Role",
    }).then((result) => {
      if (result.isConfirmed) {
        roleMutation.mutate({ 
          userId: userData.id, 
          role: result.value as Role 
        });
      }
    });
  };

  if (isLoading) return <div className="p-10 text-center text-gray-500 font-medium">Loading customers...</div>;
  if (isError) return <div className="p-10 text-center text-red-500">Failed to load data!</div>;

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 w-10 text-center"><input type="checkbox" className="rounded border-gray-300" /></th>
            <th className="p-4 font-semibold text-gray-700 uppercase">Name ↑</th>
            <th className="p-4 font-semibold text-gray-700 uppercase">Email</th>
            <th className="p-4 font-semibold text-gray-700 uppercase text-center">Role</th>
            <th className="p-4 font-semibold text-gray-700 uppercase text-center">Status</th>
            <th className="p-4 font-semibold text-gray-700 uppercase text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {customers?.map((item: any) => {
            // Flexible logic: data 'user' object-er bhetore thakle sheta nibe, na thakle item nibe
            const userData = item.user ? item.user : item;
            
            const apiStatus = userData.status || userData.userStatus;
            const apiRole = userData.role;

            return (
              <tr key={userData.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="p-4 font-medium text-gray-900">{userData.name}</td>
                <td className="p-4 text-gray-600">{userData.email}</td>
                
                {/* Role Column */}
                <td className="p-4 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${
                    apiRole === "ADMIN" 
                      ? "bg-purple-50 text-purple-700 border-purple-200" 
                      : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}>
                    {apiRole === "ADMIN" ? <ShieldCheck size={12} /> : <User size={12} />}
                    {apiRole || "CUSTOMER"}
                  </span>
                </td>

                {/* Status Column */}
                <td className="p-4 text-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border ${
                    apiStatus === "ACTIVE" ? "bg-green-50 text-green-700 border-green-200" :
                    apiStatus === "BLOCKED" ? "bg-orange-50 text-orange-700 border-orange-200" :
                    "bg-red-50 text-red-700 border-red-200"
                  }`}>
                    {apiStatus || "N/A"}
                  </span>
                </td>

                <td className="p-4 flex justify-center gap-2">
                  <button 
                    onClick={() => handleEditRole(userData)} 
                    className="p-2 text-blue-600 bg-blue-50 border border-blue-100 rounded-md hover:bg-blue-100 shadow-sm transition-all"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleStatusChange(userData)} 
                    className="p-2 text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 shadow-sm transition-all"
                  >
                    <RefreshCw size={16} className={statusMutation.isPending ? "animate-spin" : ""} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {customers?.length === 0 && (
        <div className="p-10 text-center text-gray-400">No customers found.</div>
      )}
    </div>
  );
};

export default CustomerTable;