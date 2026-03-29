import RoomTable from "@/components/module/admin/RoomTable/Roomtable";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function RoomsPage() {
  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">Rooms</h1>
          <p className="text-sm text-stone-400 mt-0.5">Manage all hotel rooms</p>
        </div>

        <Link
          href="/admin/dashboard/rooms/create-room"
          className="flex items-center gap-2 rounded-lg bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 transition"
        >
          <Plus className="h-4 w-4" />
          Create Room
        </Link>
      </div>

      {/* Table */}
      <RoomTable />

    </div>
  );
}