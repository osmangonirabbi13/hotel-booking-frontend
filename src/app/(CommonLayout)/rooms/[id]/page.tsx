import RoomDetailPage from "@/components/module/RoomDetailsPage/RoomDetailPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomDetailsPages({ params }: PageProps) {
  return <RoomDetailPage params={params} />;
}
