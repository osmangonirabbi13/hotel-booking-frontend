"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BedDouble } from "lucide-react";
import { IRoom } from "@/types/room.types";

interface OtherRoomsProps {
  rooms: IRoom[];
}

export function OtherRooms({ rooms }: OtherRoomsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!rooms || rooms.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <h2
          className="text-center text-stone-800 mb-10"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 400,
          }}
        >
          Other Rooms
        </h2>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-[38%] z-10 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {rooms.map((room) => {
              const imgSrc =
                room.featuredImage ||
                (room.sliderImages?.length ? room.sliderImages[0] : null);

              const formattedPrice = new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(room.rent || 0);

              const stats = [
                room.roomSize ? `${room.roomSize} SQ` : null,
                room.maxGuests ? `${room.maxGuests} Guests` : null,
                room.bedType?.name ?? null,
              ].filter(Boolean);

              return (
                <div
                  key={room.id || room.id}
                  className="shrink-0 w-[260px] cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative w-full h-[190px] overflow-hidden rounded-sm mb-4">
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={room.roomTitle || "Room"}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                        <BedDouble className="w-10 h-10 text-stone-300" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <h3
                    className="text-stone-800 mb-1 leading-snug"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "1.15rem",
                      fontWeight: 400,
                    }}
                  >
                    {room.roomTitle}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-stone-400 text-xs">From</span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "1.15rem",
                        fontWeight: 500,
                        color: "#b45309",
                      }}
                    >
                      $ {formattedPrice}
                    </span>
                    <span className="text-stone-400 text-xs">/ Night</span>
                  </div>

                  {/* Stats */}
                  <p className="text-stone-400 text-xs">
                    {stats.map((s, i) => (
                      <span key={i}>
                        {s}
                        {i < stats.length - 1 && (
                          <span className="mx-1.5 text-stone-300">|</span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-[38%] z-10 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      </div>
    </section>
  );
}