import CreateBedTypeForm from "@/components/module/admin/bed-type/CreateBedTypeForm";


export default function BedTypesPage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Bed Types</h1>
      <CreateBedTypeForm />
    </div>
  );
}