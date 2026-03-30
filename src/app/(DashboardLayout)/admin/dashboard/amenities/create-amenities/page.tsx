import CreateAmenityForm from "@/components/module/admin/Amenity/CreateAmenityForm";
export const dynamic = "force-dynamic";
export default function CreateAmenityPage() {
  return (
    <>
    <h1 className="text-2xl font-bold">Create Amenity Form</h1>
    <div className="p-6 bg-gray-100 min-h-screen">
      <CreateAmenityForm />
    </div>
    </>
  );
}

//