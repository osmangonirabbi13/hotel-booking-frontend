import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IRoom } from "@/types/room.types";
import { BedDouble } from "lucide-react";

interface RoomCardProps {
  room: IRoom;
}

export function RoomCard({ room }: RoomCardProps) {
  const imgSrc =
    room.featuredImage ||
    (room.sliderImages && room.sliderImages.length > 0
      ? room.sliderImages[0]
      : null);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(room.rent || 0);

  const stats = [
    room.roomSize ? `${room.roomSize} SQ` : null,
    room.maxGuests ? `${room.maxGuests} Guests` : null,
    room.bedType?.name || null,
  ].filter(Boolean);

  return (
    <Link href={`/rooms/${room.id}`} className="block group">
      <Card
        className="overflow-hidden rounded-2xl border border-stone-200 p-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white"
        style={{ fontFamily: "inherit" }}
      >
        {/* Image */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={room.roomTitle || "Hotel Room"}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100">
              <BedDouble className="w-12 h-12 text-stone-300" />
              <span className="text-[10px] text-stone-400 mt-2">No Image Available</span>
            </div>
          )}

          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {room.isFeatured && (
              <Badge className="bg-amber-600/90 text-white text-[10px] border-none shadow-sm">
                Featured
              </Badge>
            )}
            {room.isEventSpace && (
              <Badge className="bg-violet-600/90 text-white text-[10px] border-none shadow-sm">
                Event
              </Badge>
            )}
          </div>
        </div>

        <div className="px-6 pt-5 pb-6">
          <h3
            className="text-stone-900 leading-tight mb-4 line-clamp-2"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            {room.roomTitle || "Untitled Luxury Room"}
          </h3>

          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-stone-400" style={{ fontSize: "0.8rem", fontWeight: 400 }}>
              From
            </span>
            <span
              style={{
                fontFamily: "'Playfair Display', 'Georgia', serif",
                fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)",
                fontWeight: 500,
                color: "#b45309",
                letterSpacing: "0.01em",
              }}
            >
              $ {formattedPrice}
            </span>
          </div>

          <div
            className="text-stone-400 border-t border-stone-100 pt-4"
            style={{ fontSize: "0.78rem", letterSpacing: "0.01em" }}
          >
            {stats.map((stat, i) => (
              <span key={i}>
                {stat}
                {i < stats.length - 1 && (
                  <span className="mx-2 text-stone-300">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}