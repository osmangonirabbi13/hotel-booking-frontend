import Link from "next/link";
import BedTypeTable from "@/components/module/admin/bed-type/BedTypeTable";

export default function BedTypesPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bed Types</h1>

        <Link
          href="/admin/dashboard/bed-type/create-bedType"
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          + Create Bed Type
        </Link>
      </div>

      <BedTypeTable />
    </div>
  );
}