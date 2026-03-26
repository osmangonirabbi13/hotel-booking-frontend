"use client";

import { useState } from "react";
import { useCreateBedType } from "@/hooks/BadType/useCreateBedType";

export default function CreateBedTypeForm() {
  const [name, setName] = useState("");
  const { mutate, isPending } = useCreateBedType();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { name },
      {
        onSuccess: () => {
          setName("");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Create Bed Type</h2>

      <div className="flex gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter bed type name"
          className="flex-1 rounded-md border px-3 py-2 outline-none focus:border-blue-500"
          required
        />

        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-green-600 px-5 py-2 text-white disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Submit"}
        </button>
      </div>
    </form>
  );
}