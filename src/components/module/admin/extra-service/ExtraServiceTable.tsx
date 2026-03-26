/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import DataTable, { IDataTableColumn } from "@/components/ui/data-table";
import TableActionButtons from "@/components/ui/table-action-buttons";
import StatusBadge from "@/components/ui/status-badge";
import EditExtraServiceModal from "./EditExtraServiceModal";
import { IExtraService } from "@/types/extraServices.types";
import { useExtraServices } from "@/hooks/ExtraServices/useExtraServices";
import { useDeleteExtraService } from "@/hooks/ExtraServices/useDeleteExtraService";

export default function ExtraServiceTable() {
  const {
    data: extraServices = [],
    isLoading,
    isError,
  } = useExtraServices();

  const { mutate: deleteMutate, isPending: isDeleting } =
    useDeleteExtraService();

  const [selectedExtraService, setSelectedExtraService] =
    useState<IExtraService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (extraService: IExtraService) => {
    setSelectedExtraService(extraService);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedExtraService(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This extra service will be permanently deleted!",
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
          text: "Extra service has been deleted.",
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
            "Failed to delete extra service",
          icon: "error",
        });
      },
    });
  };

  const columns: IDataTableColumn<IExtraService>[] = [
    {
      key: "serviceName",
      title: "Service Name",
      render: (row) => <span className="font-medium">{row.serviceName}</span>,
    },
    {
      key: "serviceAmount",
      title: "Amount",
      render: (row) => <span>{row.serviceAmount.toFixed(2)}</span>,
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
        Failed to load extra services.
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={extraServices}
        isLoading={isLoading}
        emptyMessage="No extra services found"
        rowKey={(row) => row.id}
      />

      <EditExtraServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        extraService={selectedExtraService}
      />
    </>
  );
}