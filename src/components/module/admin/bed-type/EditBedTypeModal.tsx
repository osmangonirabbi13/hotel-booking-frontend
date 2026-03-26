"use client";

import { useEffect, useState } from "react";
import { IBedType } from "@/types/bedType.types";
import { useUpdateBedType } from "@/hooks/BadType/useUpdateBedType";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bedType: IBedType | null;
}

export default function EditBedTypeModal({
  isOpen,
  onClose,
  bedType,
}: Props) {
  const [name, setName] = useState("");
  const { mutate, isPending } = useUpdateBedType();

  useEffect(() => {
    if (bedType) {
      setName(bedType.name || "");
    }
  }, [bedType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bedType?.id) return;

    mutate(
      {
        id: bedType.id,
        payload: { name },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  if (!isOpen || !bedType) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Bed Type</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Bed Type Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter bed type name"
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}