"use client";

import { useEffect, useState } from "react";
import { IAmenity, ICreateAmenity } from "@/types/amenity.types";
import { useUpdateAmenity } from "@/hooks/Amenities/useUpdateAmenity";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  amenity: IAmenity | null;
}

export default function EditAmenityModal({ isOpen, onClose, amenity }: Props) {
  const [formData, setFormData] = useState<ICreateAmenity>({
    title: "",
    icon: "",
    serialNumber: 0,
  });

  const { mutate, isPending } = useUpdateAmenity();

  useEffect(() => {
    if (amenity) {
      setFormData({
        title: amenity.title || "",
        icon: amenity.icon || "",
        serialNumber: amenity.serialNumber || 0,
      });
    }
  }, [amenity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amenity?.id) return;

    mutate(
      {
        id: amenity.id,
        payload: {
          title: formData.title,
          icon: formData.icon || undefined,
          serialNumber: Number(formData.serialNumber),
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  if (!isOpen || !amenity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Amenity</h2>
          <button
            onClick={onClose}
            type="button"
            className="rounded-md px-2 py-1 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
              placeholder="Enter amenity title"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Icon URL</label>
            <input
              type="text"
              value={formData.icon || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, icon: e.target.value }))
              }
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
              placeholder="Enter icon url"
            />
          </div>

          {formData.icon && (
            <div>
              <Image
                src={formData.icon}
                alt="Amenity preview"
                width={64}
                height={64}
                className="h-16 w-16 rounded border object-cover"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium">Serial Number</label>
            <input
              type="number"
              value={formData.serialNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  serialNumber: Number(e.target.value),
                }))
              }
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
              placeholder="Enter serial number"
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