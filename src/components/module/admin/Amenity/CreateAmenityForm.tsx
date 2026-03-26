"use client";

import { useState } from "react";
import { useCreateAmenity } from "@/hooks/Amenities/useCreateAmenity";

export default function CreateAmenityForm() {
  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    serialNumber: 0,
  });

  const { mutate, isPending } = useCreateAmenity();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      title: formData.title,
      icon: formData.icon || undefined,
      serialNumber: Number(formData.serialNumber),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        className="border p-2 w-full"
      />

      <input
        type="text"
        placeholder="Icon URL"
        onChange={(e) =>
          setFormData({ ...formData, icon: e.target.value })
        }
        className="border p-2 w-full"
      />

      <input
        type="number"
        placeholder="Serial Number"
        onChange={(e) =>
          setFormData({
            ...formData,
            serialNumber: Number(e.target.value),
          })
        }
        className="border p-2 w-full"
      />

      <button
        type="submit"
        disabled={isPending}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}