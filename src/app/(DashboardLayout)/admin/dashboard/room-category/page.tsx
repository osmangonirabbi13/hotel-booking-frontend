import Link from "next/link";
import RoomCategoryTable from "@/components/module/admin/room-category/RoomCategoryTable";

export default function RoomCategoriesPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Room Categories</h1>

        <Link
          href="/admin/dashboard/room-category/create-roomcategory"
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          + Create Room Category
        </Link>
      </div>

      <RoomCategoryTable />
    </div>
  );
}