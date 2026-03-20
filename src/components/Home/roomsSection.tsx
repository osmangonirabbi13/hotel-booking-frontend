"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const rooms = [
  {
    id: 1,
    title: "Deluxe Rooms",
    price: "250.00",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    sqft: "3600 SQ",
    guests: "6 Guests",
    bed: "Double Bed",
    href: "/rooms/deluxe",
  },
  {
    id: 2,
    title: "Signature Room",
    price: "1,050.00",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    sqft: "7000 SQ",
    guests: "15 Guests",
    bed: "Triple Bed",
    href: "/rooms/signature",
  },
  {
    id: 3,
    title: "Luxury Villa",
    price: "350.00",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    sqft: "3300 SQ",
    guests: "6 Guests",
    bed: "Triple Bed",
    href: "/rooms/villa",
  },
  {
    id: 4,
    title: "Presidential Suite",
    price: "2,500.00",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    sqft: "5200 SQ",
    guests: "4 Guests",
    bed: "King Bed",
    href: "/rooms/presidential",
  },
  {
    id: 5,
    title: "Garden Bungalow",
    price: "480.00",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    sqft: "2800 SQ",
    guests: "3 Guests",
    bed: "Double Bed",
    href: "/rooms/bungalow",
  },
];

export default function RoomsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 1024px)": { slidesToScroll: 1 },
    },
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
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

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

          {/* Prev / Next Buttons */}
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

        {/* Embla Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="group min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-md">
                  <div className="relative h-[320px] w-full">
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="mt-5 flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#1B1B1B]">
                      {room.title}
                    </h3>
                    <p className="mt-1 flex items-baseline gap-1">
                      <span className="text-xs text-[#888]">From</span>
                      <span className="text-lg font-semibold text-[#AA8453]">
                        $ {room.price}
                      </span>
                      <span className="text-sm text-[#AA8453]">/ Night</span>
                    </p>
                    <p className="mt-2 text-xs text-[#999]">
                      {room.sqft}&nbsp;&nbsp;|&nbsp;&nbsp;{room.guests}&nbsp;&nbsp;|&nbsp;&nbsp;{room.bed}
                    </p>
                  </div>

                  {/* Arrow Button */}
                  <Link
                    href={room.href}
                    className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#AA8453]/50 text-[#AA8453] transition hover:bg-[#AA8453] hover:text-white hover:border-[#AA8453]"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
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

      </div>
    </section>
  );
}