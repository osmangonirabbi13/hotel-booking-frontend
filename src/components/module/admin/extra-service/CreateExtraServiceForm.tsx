"use client";

import { useCreateExtraService } from "@/hooks/ExtraServices/useCreateExtraService";
import { useState } from "react";


export default function CreateExtraServiceForm() {
  const [serviceName, setServiceName] = useState("");
  const [serviceAmount, setServiceAmount] = useState("");
  const [isActive, setIsActive] = useState("true");

  const { mutate, isPending } = useCreateExtraService();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      serviceName,
      serviceAmount: Number(serviceAmount),
      isActive: isActive === "true",
    });
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Service Name (English)
          </label>
          <input
            type="text"
            placeholder="Enter Service Name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="w-full rounded-md border px-4 py-3 outline-none focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Service Amount
          </label>
          <input
            type="number"
            placeholder="Enter Service Amount"
            value={serviceAmount}
            onChange={(e) => setServiceAmount(e.target.value)}
            className="w-full rounded-md border px-4 py-3 outline-none focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Status</label>
          <select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
            className="w-full rounded-md border px-4 py-3 outline-none focus:border-green-500"
          >
            <option value="">Select Status</option>
            <option value="true">Enable</option>
            <option value="false">Disable</option>
          </select>
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