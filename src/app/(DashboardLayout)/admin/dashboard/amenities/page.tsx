import AmenityList from "@/components/module/admin/Amenity/AmenityList";
import Link from "next/link";



export default function AmenitiesPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Amenities</h1>

        <Link
          href="/admin/dashboard/amenities/create-amenities"
          title="Create Amenity"
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          + Create Amenity
        </Link>
      </div>

      <AmenityList />
    </div>
  );
}