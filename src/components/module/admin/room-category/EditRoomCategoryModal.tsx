"use client";

import { useEffect, useState } from "react";
import { IRoomCategory } from "@/types/roomCategory.types";
import { useUpdateRoomCategory } from "@/hooks/roomCategory/useUpdateRoomCategory";
import ToggleSwitch from "@/components/ui/toggle-switch";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  roomCategory: IRoomCategory | null;
}

export default function EditRoomCategoryModal({
  isOpen,
  onClose,
  roomCategory,
}: Props) {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);

  const { mutate, isPending } = useUpdateRoomCategory();

  useEffect(() => {
    if (roomCategory) {
      setName(roomCategory.name || "");
      setIsActive(roomCategory.isActive);
    }
  }, [roomCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomCategory?.id) return;

    mutate(
      {
        id: roomCategory.id,
        payload: {
          name,
          isActive,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  if (!isOpen || !roomCategory) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Room Category</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Is Active:</label>
            <ToggleSwitch checked={isActive} onChange={setIsActive} />
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