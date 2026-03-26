/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { IAmenity } from "@/types/amenity.types";
import { useDeleteAmenity } from "@/hooks/Amenities/useDeleteAmenity";  
import EditAmenityModal from "./EditAmenityModal";
import { useAmenities } from "@/hooks/Amenities/useAmenities";
import Swal from "sweetalert2";

export default function AmenityList() {
  const { data: amenities = [], isLoading, isError } = useAmenities();
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteAmenity();

  const [selectedAmenity, setSelectedAmenity] = useState<IAmenity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (amenity: IAmenity) => {
    setSelectedAmenity(amenity);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This amenity will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    deleteMutate(id, {
      onSuccess: () => {
        Swal.fire({
          title: "Deleted!",
          text: "Amenity has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      },

      onError: (error: any) => {
        Swal.fire({
          title: "Error!",
          text:
            error?.response?.data?.message ||
            "Failed to delete amenity",
          icon: "error",
        });
      },
    });
  }
};

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAmenity(null);
  };

  if (isLoading) {
    return (
       <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-white dark:bg-slate-900">
      {/* Outer Spinning Ring */}
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Loading...
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Please wait a moment.
        </p>
      </div>
    </div>
    )
  }

  if (isError) {
    return (
       <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-white dark:bg-slate-900">
      {/* Outer Spinning Ring */}
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Loading...
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Please wait a moment.
        </p>
      </div>
    </div>
    )
  }

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="border-b px-4 py-3 font-semibold">Icon</th>
              <th className="border-b px-4 py-3 font-semibold">Title</th>
              <th className="border-b px-4 py-3 font-semibold">Serial Number</th>
              <th className="border-b px-4 py-3 text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {amenities.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No amenities found
                </td>
              </tr>
            ) : (
              amenities.map((amenity) => (
                <tr key={amenity.id} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-3">
                    {amenity.icon ? (
                      <img
                        src={amenity.icon}
                        alt={amenity.title}
                        className="h-10 w-10 rounded object-cover border"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded border text-xs text-gray-400">
                        N/A
                      </div>
                    )}
                  </td>

                  <td className="border-b px-4 py-3">{amenity.title}</td>
                  <td className="border-b px-4 py-3">{amenity.serialNumber}</td>

                  <td className="border-b px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(amenity)}
                        className="rounded-md bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                        title="Edit"
                        type="button"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
  onClick={() => handleDelete(amenity.id)}
  className="rounded-md bg-red-50 p-2 text-red-600 hover:bg-red-100"
>
  <Trash2 size={16} />
</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <EditAmenityModal
        isOpen={isModalOpen}
        onClose={closeModal}
        amenity={selectedAmenity}
      />
    </div>
  );
}