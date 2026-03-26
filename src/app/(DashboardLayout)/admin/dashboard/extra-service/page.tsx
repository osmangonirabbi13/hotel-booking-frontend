import Link from "next/link";
import ExtraServiceTable from "@/components/module/admin/extra-service/ExtraServiceTable";

export default function ExtraServicesPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Extra Services</h1>

        <Link
          href="/admin/dashboard/extra-service/create-extra-service"
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          + Create Extra Service
        </Link>
      </div>

      <ExtraServiceTable />
    </div>
  );
}