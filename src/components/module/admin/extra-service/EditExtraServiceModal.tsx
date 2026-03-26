"use client";

import { useEffect, useState } from "react";
import { IExtraService } from "@/types/extraServices.types";
import { useUpdateExtraService } from "@/hooks/ExtraServices/useUpdateExtraService";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  extraService: IExtraService | null;
}

export default function EditExtraServiceModal({
  isOpen,
  onClose,
  extraService,
}: Props) {
  const [serviceName, setServiceName] = useState("");
  const [serviceAmount, setServiceAmount] = useState("");
  const [isActive, setIsActive] = useState("true");

  const { mutate, isPending } = useUpdateExtraService();

  useEffect(() => {
    if (extraService) {
      setServiceName(extraService.serviceName || "");
      setServiceAmount(String(extraService.serviceAmount ?? ""));
      setIsActive(String(extraService.isActive));
    }
  }, [extraService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!extraService?.id) return;

    mutate(
      {
        id: extraService.id,
        payload: {
          serviceName,
          serviceAmount: Number(serviceAmount),
          isActive: isActive === "true",
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  if (!isOpen || !extraService) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Extra Service</h2>
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
              Service Name
            </label>
            <input
              type="text"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="Enter service name"
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Service Amount
            </label>
            <input
              type="number"
              value={serviceAmount}
              onChange={(e) => setServiceAmount(e.target.value)}
              placeholder="Enter service amount"
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Status</label>
            <select
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-blue-500"
            >
              <option value="true">Enable</option>
              <option value="false">Disable</option>
            </select>
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