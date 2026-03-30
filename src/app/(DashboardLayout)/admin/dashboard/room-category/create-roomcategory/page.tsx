import CreateRoomCategoryForm from "@/components/module/admin/room-category/CreateRoomCategoryForm";
export const dynamic = "force-dynamic";


export default function CreateRoomCategoryPage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Create Room Category</h1>
      <CreateRoomCategoryForm />
    </div>
  );
}