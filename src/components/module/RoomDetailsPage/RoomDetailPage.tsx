/* eslint-disable @typescript-eslint/no-explicit-any */

import { getRoomById, getRooms } from "@/services/room.service";

import { RoomDescription }      from "@/components/module/RoomDetailsPage/RoomDescription";
import { RoomAboutReservation } from "@/components/module/RoomDetailsPage/RoomAboutReservation";
import { RoomGallery }          from "@/components/module/RoomDetailsPage/Roomgallery";

import { OtherRooms }           from "./OtherRooms";
import { RoomHero }             from "./RoomHero";
import { WhyChooseUs } from "./Whychooseus";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { id } = await params; 

  const response = await getRoomById(id);
  const room     = response.data;

  const allRooms   = await getRooms();
  const otherRooms = (allRooms?.data ?? []).filter(
    (r: any) => r.id !== id
  );

  const heroImage =
    room.featuredImage ||
    (room.sliderImages?.length ? room.sliderImages[0] : "");

  return (
    <main className="min-h-screen bg-white">
      <RoomHero title={room.roomTitle} image={heroImage} />
      <RoomDescription description={room.description ?? ""} />
      <RoomAboutReservation room={room} />
      <RoomGallery images={room.sliderImages ?? []} />
      <WhyChooseUs/>
      <OtherRooms rooms={otherRooms} />
    </main>
  );
}