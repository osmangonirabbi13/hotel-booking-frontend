"use client";

import { Pencil, Trash2 } from "lucide-react";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

export default function TableActionButtons({
  onEdit,
  onDelete,
  isDeleting = false,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={onEdit}
        className="rounded-md bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
        title="Edit"
      >
        <Pencil size={16} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={isDeleting}
        className="rounded-md bg-red-50 p-2 text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}