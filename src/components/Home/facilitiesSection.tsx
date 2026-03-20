"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const facilities = [
  {
    id: 1,
    title: "Restaurant & Bar",
    description:
      "Exceptional dining awaits at our resort. Immerse yourself in exquisite flavors with view to match. Pure indulgence, effortlessly delivered.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    href: "/facilities/restaurant",
  },
  {
    id: 2,
    title: "Spa & Wellness",
    description:
      "Discover serenity at our spa. Indulge in blissful treatments and unwind in a haven of relaxation. Your path to rejuvenation starts here.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    href: "/facilities/spa",
  },
  {
    id: 3,
    title: "Infinity Pool",
    description:
      "Our Infinity Pool Escape. Surrender to breath taking views and pure relaxation as you soak in the serenity of our infinity pool.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    href: "/facilities/pool",
  },
  {
    id: 4,
    title: "Fitness Center",
    description:
      "State-of-the-art equipment and personal trainers to help you maintain your wellness routine in a luxurious setting.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    href: "/facilities/gym",
  },
  {
    id: 5,
    title: "Private Beach",
    description:
      "Step onto our exclusive private beach and feel the warm sand beneath your feet. A pristine escape reserved just for our guests.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    href: "/facilities/beach",
  },
];

export default function FacilitiesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
  });

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-[#F9F8F6] py-20 px-4">
      <div className="mx-auto max-w-[1360px]">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#AA8453]">
            Luxurious Facilities
          </p>
          <h2 className="font-serif text-4xl font-normal text-[#1B1B1B] md:text-5xl">
            Explore Our Exclusive Resort Facilities
          </h2>
        </div>

        {/* Carousel Wrapper with outside arrows */}
        <div className="relative flex items-center gap-4">

          {/* Prev Arrow */}
          <button
            onClick={scrollPrev}
            disabled={prevDisabled}
            aria-label="Previous"
            className="hidden shrink-0 text-[#1B1B1B] transition hover:text-[#AA8453] disabled:opacity-20 disabled:cursor-not-allowed lg:block"
          >
            <ArrowLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>

          {/* Embla */}
          <div className="overflow-hidden w-full" ref={emblaRef}>
            <div className="flex gap-6">
              {facilities.map((item) => (
                <div
                  key={item.id}
                  className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                >
                  {/* Image */}
                  <div className="relative h-[280px] w-full overflow-hidden rounded-sm">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-6">
                    <h3 className="font-serif text-2xl font-normal text-[#1B1B1B]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#888]">
                      {item.description}
                    </p>
                    <Link
                      href={item.href}
                      className="mt-6 inline-flex items-center gap-2 border border-[#1B1B1B] px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#1B1B1B] transition hover:bg-[#1B1B1B] hover:text-white"
                    >
                      Learn More
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={scrollNext}
            disabled={nextDisabled}
            aria-label="Next"
            className="hidden shrink-0 text-[#1B1B1B] transition hover:text-[#AA8453] disabled:opacity-20 disabled:cursor-not-allowed lg:block"
          >
            <ArrowRight className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile Arrows */}
        <div className="mt-8 flex justify-center gap-4 lg:hidden">
          <button
            onClick={scrollPrev}
            disabled={prevDisabled}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1B1B1B]/30 text-[#1B1B1B] transition hover:border-[#AA8453] hover:text-[#AA8453] disabled:opacity-20"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={scrollNext}
            disabled={nextDisabled}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1B1B1B]/30 text-[#1B1B1B] transition hover:border-[#AA8453] hover:text-[#AA8453] disabled:opacity-20"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </section>
  );
}
