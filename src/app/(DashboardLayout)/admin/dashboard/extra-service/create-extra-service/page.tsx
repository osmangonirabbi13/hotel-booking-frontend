import CreateExtraServiceForm from "@/components/module/admin/extra-service/CreateExtraServiceForm";
export const dynamic = "force-dynamic";
export default function CreateExtraServicePage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Create Extra Service</h1>
      <CreateExtraServiceForm />
    </div>
  );
}