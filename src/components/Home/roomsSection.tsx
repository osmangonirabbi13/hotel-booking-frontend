"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "@/services/room.service";

interface IRoom {
  id: string;
  roomTitle: string;
  rent: number;
  featuredImage?: string | null;
  sliderImages?: string[];
  roomSize?: number;
  maxGuests?: number;
  bedType?: { name?: string };
}

export default function RoomsSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["home-rooms"],
    queryFn: async () => {
      const res = await getRooms("limit=6");
      return res.data;
    },
  });

  const rooms: IRoom[] = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
    ? data
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: { "(min-width: 1024px)": { slidesToScroll: 1 } },
  });

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo   = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section className="bg-[#F9F8F6] py-20 px-4 overflow-hidden">
      <div className="mx-auto max-w-[1360px]">

        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#AA8453]">
              Rooms &amp; Suites
            </p>
            <h2 className="font-serif text-4xl font-normal text-[#1B1B1B] md:text-5xl">
              Our Exquisite Rooms &amp; Suites Collection
            </h2>
          </div>

          <div className="mt-6 flex gap-3 sm:mt-0 sm:shrink-0">
            <button
              onClick={scrollPrev}
              disabled={prevDisabled}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#AA8453]/50 text-[#AA8453] transition hover:bg-[#AA8453] hover:text-white hover:border-[#AA8453] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={scrollNext}
              disabled={nextDisabled}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#AA8453]/50 text-[#AA8453] transition hover:bg-[#AA8453] hover:text-white hover:border-[#AA8453] disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* States */}
        {isLoading ? (
          <div className="py-10 text-center text-gray-500">Loading rooms...</div>
        ) : isError ? (
          <div className="py-10 text-center text-red-500">Failed to load rooms</div>
        ) : rooms.length === 0 ? (
          <div className="py-10 text-center text-gray-500">No rooms found</div>
        ) : (
          <>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {rooms.map((room) => {
                  const image =
                    room.featuredImage ||
                    room.sliderImages?.[0] ||
                    "/placeholder-room.jpg";

                  return (
                    <div
                      key={room.id}
                      className="group min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                    >
                      {/* ✅ Clickable image */}
                      <Link href={`/rooms/${room.id}`} className="block">
                        <div className="relative overflow-hidden rounded-md">
                          <div className="relative h-[320px] w-full">
                            <Image
                              src={image}
                              alt={room.roomTitle || "Room"}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                        </div>
                      </Link>

                      <div className="mt-5 flex items-start justify-between">
                        <div>
                          {/* ✅ Clickable title */}
                          <Link href={`/rooms/${room.id}`}>
                            <h3 className="font-serif text-2xl font-normal text-[#1B1B1B] hover:text-[#AA8453] transition-colors">
                              {room.roomTitle}
                            </h3>
                          </Link>

                          <p className="mt-1 flex items-baseline gap-1">
                            <span className="text-xs text-[#888]">From</span>
                            <span className="text-lg font-semibold text-[#AA8453]">
                              $ {room.rent?.toFixed(2)}
                            </span>
                            <span className="text-sm text-[#AA8453]">/ Night</span>
                          </p>

                          <p className="mt-2 text-xs text-[#999]">
                            {room.roomSize ?? 0} SQ&nbsp;&nbsp;|&nbsp;&nbsp;
                            {room.maxGuests ?? 0} Guests&nbsp;&nbsp;|&nbsp;&nbsp;
                            {room.bedType?.name || "N/A"}
                          </p>
                        </div>

                        {/* Arrow button — already had link */}
                        <Link
                          href={`/rooms/${room.id}`}
                          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#AA8453]/50 text-[#AA8453] transition hover:bg-[#AA8453] hover:text-white hover:border-[#AA8453]"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dots */}
            <div className="mt-8 flex justify-center gap-2">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "w-8 bg-[#AA8453]"
                      : "w-4 bg-[#AA8453]/30 hover:bg-[#AA8453]/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}