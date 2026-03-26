/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import DataTable, { IDataTableColumn } from "@/components/ui/data-table";
import TableActionButtons from "@/components/ui/table-action-buttons";
import StatusBadge from "@/components/ui/status-badge";
import EditRoomCategoryModal from "./EditRoomCategoryModal";
import { IRoomCategory } from "@/types/roomCategory.types";
import { useRoomCategories } from "@/hooks/roomCategory/useRoomCategories";
import { useDeleteRoomCategory } from "@/hooks/roomCategory/useDeleteRoomCategory";

export default function RoomCategoryTable() {
  const {
    data: roomCategories = [],
    isLoading,
    isError,
  } = useRoomCategories();

  const { mutate: deleteMutate, isPending: isDeleting } =
    useDeleteRoomCategory();

  const [selectedRoomCategory, setSelectedRoomCategory] =
    useState<IRoomCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (roomCategory: IRoomCategory) => {
    setSelectedRoomCategory(roomCategory);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRoomCategory(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This room category will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    deleteMutate(id, {
      onSuccess: () => {
        Swal.fire({
          title: "Deleted!",
          text: "Room category has been deleted.",
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
            "Failed to delete room category",
          icon: "error",
        });
      },
    });
  };

  const columns: IDataTableColumn<IRoomCategory>[] = [
    {
      key: "name",
      title: "Room Category",
      render: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      key: "status",
      title: "Status",
      render: (row) => <StatusBadge active={row.isActive} />,
    },
    {
      key: "action",
      title: "Action",
      className: "text-center w-40",
      render: (row) => (
        <TableActionButtons
          onEdit={() => handleEdit(row)}
          onDelete={() => handleDelete(row.id)}
          isDeleting={isDeleting}
        />
      ),
    },
  ];

  if (isError) {
    return (
      <div className="rounded-xl border bg-white p-6 text-sm text-red-500 shadow-sm">
        Failed to load room categories.
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={roomCategories}
        isLoading={isLoading}
        emptyMessage="No room categories found"
        rowKey={(row) => row.id}
      />

      <EditRoomCategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        roomCategory={selectedRoomCategory}
      />
    </>
  );
}