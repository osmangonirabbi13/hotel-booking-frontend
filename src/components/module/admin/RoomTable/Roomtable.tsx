"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

import { IRoom, IUpdateRoomPayload } from "@/types/room.types";
import { useRooms, roomKeys } from "@/hooks/rooms/useRooms";
import { deleteRoom,  updateRoom } from "@/services/room.service";


// ── Extract backend error message ─────────────────────────
function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.error ||
      error.response?.data?.message ||
      fallback
    );
  }
  return fallback;
}

// ── Strip empty/null/undefined fields before sending ──────
function stripEmpty(obj: IUpdateRoomPayload): IUpdateRoomPayload {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== "" && v !== null && v !== undefined
    )
  ) as IUpdateRoomPayload;
}

// ── Toggle Switch ──────────────────────────────────────────
function Toggle({
  checked, onChange, disabled,
}: {
  checked: boolean; onChange: () => void; disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
        checked ? "translate-x-6" : "translate-x-1"
      }`} />
    </button>
  );
}

// ── Field wrapper ──────────────────────────────────────────
const inputCls = "w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300 transition";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

// ── Update Modal ───────────────────────────────────────────
function UpdateModal({
  room, onClose, onSave, isLoading,
}: {
  room: IRoom;
  onClose: () => void;
  onSave: (payload: IUpdateRoomPayload) => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState<IUpdateRoomPayload>({
    roomTitle:            room.roomTitle       ?? "",
    featuredTitle:        room.featuredTitle   ?? "",
    description:          room.description     ?? "",
    rent:                 room.rent,
    totalUnits:           room.totalUnits,
    roomSize:             room.roomSize,
    numberOfBaths:        room.numberOfBaths,
    maxGuests:            room.maxGuests,
    maxAdults:            room.maxAdults,
    maxChildren:          room.maxChildren,
    isFeatured:           room.isFeatured,
    isActive:             room.isActive,
    isEventSpace:         room.isEventSpace,
    enableDynamicPricing: room.enableDynamicPricing,
  });

  const set = (key: keyof IUpdateRoomPayload, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-base font-semibold text-stone-800">Update Room</h2>
            <p className="text-xs text-stone-400 mt-0.5 truncate max-w-xs">{room.roomTitle}</p>
          </div>
          <button onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-stone-100 text-stone-400 transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(stripEmpty(form)); // ✅ empty strings strip করে পাঠাও
          }}
          className="px-6 py-5 space-y-5"
        >
          <Field label="Room Title">
            <input
              value={form.roomTitle ?? ""}
              onChange={(e) => set("roomTitle", e.target.value)}
              className={inputCls}
              placeholder="e.g. Deluxe Ocean View"
            />
          </Field>

          <Field label="Featured Title">
            <input
              value={form.featuredTitle ?? ""}
              onChange={(e) => set("featuredTitle", e.target.value)}
              className={inputCls}
              placeholder="e.g. Perfect for Family Stay"
            />
          </Field>

          <Field label="Description">
            <textarea
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              className={`${inputCls} resize-none`}
              rows={3}
              placeholder="Room description..."
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Rent ($ / Night)">
              <input type="number" min={0} value={form.rent ?? ""}
                onChange={(e) => set("rent", Number(e.target.value))}
                className={inputCls} />
            </Field>
            <Field label="Total Units">
              <input type="number" min={1} value={form.totalUnits ?? ""}
                onChange={(e) => set("totalUnits", Number(e.target.value))}
                className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Room Size (SQ)">
              <input type="number" min={0} value={form.roomSize ?? ""}
                onChange={(e) => set("roomSize", Number(e.target.value))}
                className={inputCls} />
            </Field>
            <Field label="Number of Baths">
              <input type="number" min={0} value={form.numberOfBaths ?? ""}
                onChange={(e) => set("numberOfBaths", Number(e.target.value))}
                className={inputCls} />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Max Guests">
              <input type="number" min={1} value={form.maxGuests ?? ""}
                onChange={(e) => set("maxGuests", Number(e.target.value))}
                className={inputCls} />
            </Field>
            <Field label="Max Adults">
              <input type="number" min={1} value={form.maxAdults ?? ""}
                onChange={(e) => set("maxAdults", Number(e.target.value))}
                className={inputCls} />
            </Field>
            <Field label="Max Children">
              <input type="number" min={0} value={form.maxChildren ?? ""}
                onChange={(e) => set("maxChildren", Number(e.target.value))}
                className={inputCls} />
            </Field>
          </div>

          {/* Boolean Toggles */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {(
              [
                { key: "isFeatured",          label: "Featured"        },
                { key: "isActive",             label: "Active"          },
                { key: "isEventSpace",         label: "Event Space"     },
                { key: "enableDynamicPricing", label: "Dynamic Pricing" },
              ] as { key: keyof IUpdateRoomPayload; label: string }[]
            ).map(({ key, label }) => (
              <div key={key}
                className="flex items-center justify-between rounded-lg border border-stone-100 bg-stone-50 px-4 py-2.5">
                <span className="text-sm text-stone-600">{label}</span>
                <Toggle checked={!!form[key]} onChange={() => set(key, !form[key])} />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-stone-100">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition">
              Cancel
            </button>
            <button type="submit" disabled={isLoading}
              className="px-5 py-2 text-sm rounded-lg bg-stone-800 text-white hover:bg-stone-700 transition disabled:opacity-60">
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Delete Modal ───────────────────────────────────────────
function DeleteModal({
  room, onConfirm, onCancel, isLoading,
}: {
  room: IRoom; onConfirm: () => void; onCancel: () => void; isLoading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
        <h3 className="text-base font-semibold text-stone-800 mb-2">Delete Room</h3>
        <p className="text-sm text-stone-500 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-medium text-stone-700">{room.roomTitle}</span>?{" "}
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={isLoading}
            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-60">
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Table ─────────────────────────────────────────────
export default function RoomTable() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useRooms({
    page: 1, limit: 20, sortBy: "createdAt", sortOrder: "desc",
    searchTerm: "", categoryId: "", bedTypeId: "", isEventSpace: "",
    isFeatured: "", isActive: "", enableDynamicPricing: "",
    minRent: "", maxRent: "", minRoomSize: "", maxRoomSize: "",
    numberOfBaths: "", minGuests: "", maxGuests: "", maxAdults: "",
    maxChildren: "", totalUnits: "",
  });

  const rooms: IRoom[] = data?.data ?? [];

  const [selected,     setSelected]     = useState<string[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<IRoom | null>(null);
  const [editTarget,   setEditTarget]   = useState<IRoom | null>(null);

  // ── Quick isFeatured toggle — full payload পাঠাও ────────
  const { mutate: toggleFeatured, isPending: isToggling } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IUpdateRoomPayload }) =>
      updateRoom(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
      toast.success("Room updated");
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Failed to update room")),
  });

  // ── Full update from modal ─────────────────────────────
  const { mutate: saveUpdate, isPending: isSaving } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IUpdateRoomPayload }) =>
      updateRoom(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomKeys.all });
      toast.success("Room updated successfully");
      setEditTarget(null);
    },
    onError: (error) =>
      toast.error(getErrorMessage(error, "Failed to update room")),
  });

  // ── Delete ─────────────────────────────────────────────
  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
  mutationFn: (id: string) => deleteRoom(id),

  onSuccess: (res) => {
    if (!res.success) {
      toast.error(res.message);   
      return;
    }

    toast.success(res.message);
    queryClient.invalidateQueries({ queryKey: roomKeys.all });
    setDeleteTarget(null);
  },

  onError: (error) => {
    const message =
      error instanceof Error ? error.message : "Failed to delete room";
    toast.error(message);
  },
});

  const allSelected = rooms.length > 0 && selected.length === rooms.length;
  const toggleAll   = () => setSelected(allSelected ? [] : rooms.map((r) => r.id));
  const toggleOne   = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  if (isLoading)
    return <div className="py-12 text-center text-sm text-stone-400">Loading rooms...</div>;
  if (isError)
    return <div className="py-12 text-center text-sm text-red-500">Failed to load rooms.</div>;

  return (
    <>
      <div className="w-full overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
              <th className="px-4 py-3 w-10">
                <input type="checkbox" checked={allSelected} onChange={toggleAll}
                  className="rounded border-stone-300 accent-blue-500" />
              </th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-center">Featured</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100">
            {rooms.map((room) => (
              <tr key={room.id}
                className={`transition-colors hover:bg-stone-50 ${
                  selected.includes(room.id) ? "bg-blue-50/40" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.includes(room.id)}
                    onChange={() => toggleOne(room.id)}
                    className="rounded border-stone-300 accent-blue-500" />
                </td>

                <td className="px-4 py-3">
                  <span className="font-medium text-stone-700">{room.roomTitle}</span>{" "}
                  <Link href={`/rooms/${room.id}`} target="_blank"
                    className="text-blue-500 hover:underline text-xs">
                    
                  </Link>
                </td>

                <td className="px-4 py-3 text-stone-500">
                  {room.category?.name ?? "—"}
                </td>

                <td className="px-4 py-3 text-center">
                  <Toggle
                    checked={room.isFeatured}
                    disabled={isToggling}
                    onChange={() =>
                      toggleFeatured({
                        id: room.id,
                        // ✅ backend Zod required fields সহ পাঠাও
                        payload: {
                          rent:          room.rent,
                          totalUnits:    room.totalUnits,
                          numberOfBaths: room.numberOfBaths,
                          maxGuests:     room.maxGuests,
                          roomTitle:     room.roomTitle,
                          featuredTitle: room.featuredTitle,
                          isFeatured:    !room.isFeatured,
                        },
                      })
                    }
                  />
                </td>

                <td className="px-4 py-3 text-right font-medium text-stone-700">
                  ${" "}
                  {new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(room.rent)}
                </td>

                <td className="px-4 py-3 text-center">
                  <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                    room.isActive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                  }`}>
                    {room.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => setEditTarget(room)}
                      className="flex h-8 w-8 items-center justify-center rounded border border-blue-200 text-blue-500 hover:bg-blue-50 transition">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => setDeleteTarget(room)}
                      className="flex h-8 w-8 items-center justify-center rounded border border-red-200 text-red-400 hover:bg-red-50 transition">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {rooms.length === 0 && (
              <tr>
                <td colSpan={7} className="py-16 text-center text-sm text-stone-400">
                  No rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {editTarget && (
        <UpdateModal
          room={editTarget}
          isLoading={isSaving}
          onClose={() => setEditTarget(null)}
          onSave={(payload) => saveUpdate({ id: editTarget.id, payload })}
        />
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          room={deleteTarget}
          isLoading={isDeleting}
          onConfirm={() => handleDelete(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}