"use client";

import { useState } from "react";
import ToggleSwitch from "@/components/ui/toggle-switch";
import { useCreateRoomCategory } from "@/hooks/roomCategory/useCreateRoomCategory";

export default function CreateRoomCategoryForm() {
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);

  const { mutate, isPending } = useCreateRoomCategory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      name,
      isActive,
    });
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Category Name (English)
          </label>
          <input
            type="text"
            placeholder="Enter Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border px-4 py-3 outline-none focus:border-green-500"
            required
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Is Active:</label>
          <ToggleSwitch checked={isActive} onChange={setIsActive} />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600 disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}