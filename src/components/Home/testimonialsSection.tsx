"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Cecilia Brooks",
    role: "VIP Guest",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    rating: 4.5,
    review:
      "Exceptional resort! From the exquisite dining to the serene spa and the captivating infinity pool, every moment was pure bliss. Impeccable service and breathtaking views – a perfect escape!",
  },
  {
    id: 2,
    name: "James Hartwell",
    role: "Returning Guest",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    rating: 5,
    review:
      "SeaPearl is a sanctuary unlike any other. The staff remembered our preferences from last year, and every detail was thoughtfully arranged. We left feeling truly renewed.",
  },
  {
    id: 3,
    name: "Amara Osei",
    role: "Honeymoon Guest",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    rating: 5,
    review:
      "We chose SeaPearl for our honeymoon and it exceeded every expectation. The ocean view suite, the candlelit dinner on the terrace — pure magic. We will be back for every anniversary.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span key={star} className="relative inline-block">
            {/* Background star (empty) */}
            <Star className="h-5 w-5 text-green-200" strokeWidth={0} fill="currentColor" />
            {/* Foreground fill */}
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: half ? "50%" : "100%" }}
              >
                <Star className="h-5 w-5 text-green-500" strokeWidth={0} fill="currentColor" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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
    <section className="relative bg-[#F5F3EE] py-20 px-4 overflow-hidden">
      <div className="mx-auto max-w-[900px]">

        {/* Embla */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="min-w-0 flex-[0_0_100%] flex flex-col items-center text-center px-4"
              >
                {/* Avatar */}
                <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full ring-2 ring-[#AA8453]/30">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name & Role */}
                <p className="text-sm font-medium text-[#1B1B1B]">{t.name}</p>
                <p className="mt-0.5 text-xs text-[#999] tracking-wide">{t.role}</p>

                {/* Giant decorative quotes */}
                <div className="relative my-8 w-full">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 flex items-center justify-center font-serif text-[200px] leading-none text-[#D6CEBC]/60 select-none"
                    style={{ top: "-0.15em" }}
                  >
                    ❝
                  </span>

                  {/* Review Text */}
                  <blockquote className="relative z-10 font-serif text-xl font-normal leading-relaxed text-[#2A2A2A] md:text-2xl lg:text-[1.65rem]">
                    {t.review}
                  </blockquote>
                </div>

                {/* Stars */}
                <StarRating rating={t.rating} />
              </div>
            ))}
          </div>
        </div>

        {/* Counter + Nav — bottom right */}
        <div className="mt-10 flex items-center justify-between px-2">

          {/* Dot nav — left */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-8 bg-[#AA8453]"
                    : "w-3 bg-[#AA8453]/30 hover:bg-[#AA8453]/60"
                }`}
              />
            ))}
          </div>

          {/* Slide counter — right */}
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-4xl font-normal text-[#AA8453]">
              {selectedIndex + 1}
            </span>
            <span className="text-lg text-[#999]">/{testimonials.length}</span>
          </div>
        </div>

        {/* Invisible wide click zones for prev/next */}
        <button
          onClick={scrollPrev}
          aria-label="Previous"
          className="absolute left-0 top-0 h-full w-1/4 cursor-default"
        />
        <button
          onClick={scrollNext}
          aria-label="Next"
          className="absolute right-0 top-0 h-full w-1/4 cursor-default"
        />

      </div>
    </section>
  );
}