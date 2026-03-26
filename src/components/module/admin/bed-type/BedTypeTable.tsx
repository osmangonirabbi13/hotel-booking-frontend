/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import DataTable, { IDataTableColumn } from "@/components/ui/data-table";
import TableActionButtons from "@/components/ui/table-action-buttons";
import EditBedTypeModal from "./EditBedTypeModal";
import { useBedTypes } from "@/hooks/BadType/useBedTypes";
import { useDeleteBedType } from "@/hooks/BadType/useDeleteBedType";
import { IBedType } from "@/types/bedType.types";

export default function BedTypeTable() {
  const { data: bedTypes = [], isLoading, isError } = useBedTypes();
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteBedType();

  const [selectedBedType, setSelectedBedType] = useState<IBedType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (bedType: IBedType) => {
    setSelectedBedType(bedType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBedType(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This bed type will be permanently deleted!",
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
          text: "Bed type has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      },
      onError: (error: any) => {
        Swal.fire({
          title: "Error!",
          text:
            error?.response?.data?.message || "Failed to delete bed type",
          icon: "error",
        });
      },
    });
  };

  const columns: IDataTableColumn<IBedType>[] = [
  {
    key: "sl",
    title: "#",
    render: (_row, index) => index + 1,
    className: "w-20",
  },
  {
    key: "name",
    title: "Bed Type Name",
    render: (row) => <span className="font-medium">{row.name}</span>,
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
        Failed to load bed types.
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={bedTypes}
        isLoading={isLoading}
        emptyMessage="No bed types found"
        rowKey={(row) => row.id}
      />

      <EditBedTypeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        bedType={selectedBedType}
      />
    </>
  );
}