// @/components/BookingTable/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { IBooking } from "@/types/booking.types";
import { Trash2, Edit, CheckCircle, Clock, XCircle } from "lucide-react";

export const getColumns = (
  onDelete: (id: string) => void,
  onEdit: (id: string, currentStatus: string) => void
): ColumnDef<IBooking>[] => [
  {
    accessorKey: "id",
    header: "Booking ID",
    cell: ({ row }) => (
      <span className="text-blue-600 font-medium">
        #{row.original.id.slice(-6).toUpperCase()}
      </span>
    ),
  },
  {
    accessorKey: "customer.name",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.customer?.name || "Guest"}</div>
        <div className="text-[11px] text-gray-400">{row.original.customer?.email}</div>
      </div>
    ),
  },
  {
    accessorKey: "room.roomTitle",
    header: "Room",
    cell: ({ row }) => row.original.room?.roomTitle || "Ocean View Room",
  },
  {
    accessorKey: "totalPrice",
    header: "Amount",
    cell: ({ row }) => <span className="font-semibold">${row.original.totalPrice}</span>,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      const styles = {
        CONFIRMED: "bg-green-100 text-green-700 border-green-200",
        PENDING: "bg-amber-100 text-amber-700 border-amber-200",
        CANCELED: "bg-red-100 text-red-700 border-red-200",
      };
      return (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-bold w-fit ${styles[status as keyof typeof styles] || "bg-gray-100"}`}>
          {status === "CONFIRMED" && <CheckCircle size={10} />}
          {status === "PENDING" && <Clock size={10} />}
          {status === "CANCELED" && <XCircle size={10} />}
          {status}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(row.original.id, row.original.status)}
          className="p-2 hover:bg-blue-50 text-blue-500 rounded-md transition-colors"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => onDelete(row.original.id)}
          className="p-2 hover:bg-red-50 text-red-500 rounded-md transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
];