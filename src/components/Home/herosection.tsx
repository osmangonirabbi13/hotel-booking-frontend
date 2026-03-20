"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MoveLeft, MoveRight } from "lucide-react";
import BookingBar from "./bookingbar";


const slides = [
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    alt: "Luxury resort pool",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1800&auto=format&fit=crop",
    alt: "Seaside villa",
  },
  {
    src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1800&auto=format&fit=crop",
    alt: "Beach resort",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrent((index + slides.length) % slides.length);
  };

  return (
    <section
      className="
        relative
        min-h-[620px]
        sm:min-h-[700px]
        lg:min-h-[860px]
      "
    >
      {/* Background slides */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        type="button"
        onClick={() => goToSlide(current - 1)}
        aria-label="Previous slide"
        className="
          absolute left-2 top-1/2 z-20 -translate-y-1/2
          p-2 text-white/80 transition hover:text-white
          sm:left-4
          lg:left-8
        "
      >
        <MoveLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-9 lg:w-9" />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => goToSlide(current + 1)}
        aria-label="Next slide"
        className="
          absolute right-2 top-1/2 z-20 -translate-y-1/2
          p-2 text-white/80 transition hover:text-white
          sm:right-4
          lg:right-8
        "
      >
        <MoveRight className="h-6 w-6 sm:h-7 sm:w-7 lg:h-9 lg:w-9" />
      </button>

      {/* Hero content */}
      <div
        className="
          relative z-10
          flex min-h-[620px] flex-col items-center justify-center
          px-4 pt-24 pb-44 text-center text-white
          sm:min-h-[700px] sm:px-6 sm:pt-28 sm:pb-48
          lg:min-h-[860px] lg:px-8 lg:pt-24 lg:pb-40
        "
      >
        <div className="mx-auto max-w-6xl">
          <p
            className="
              mb-5
              text-[10px] font-medium uppercase tracking-[2px] text-white/90
              sm:mb-7 sm:text-[11px] sm:tracking-[4px]
              lg:text-xs
            "
          >
            ✱ A Seaside Oasis for Tranquility and Rejuvenation ✱
          </p>

          <h1
            className="
              mx-auto max-w-[11ch]
              font-light leading-[0.95]
              sm:max-w-[12ch]
              lg:max-w-none lg:leading-[1.02]
            "
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(38px, 7vw, 92px)",
            }}
          >
            Welcome to Our Luxurious
            <br />
            Hotel &amp; Resort
          </h1>
        </div>
      </div>

      {/* Dots */}
      <div
        className="
          absolute left-1/2 z-20 flex -translate-x-1/2 gap-2
          bottom-[150px]
          sm:bottom-[158px]
          lg:bottom-[128px]
        "
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-[2px] transition-all duration-300 ${
              i === current ? "w-10 bg-white sm:w-12" : "w-6 bg-white/40 sm:w-7"
            }`}
          />
        ))}
      </div>

      {/* Booking bar */}
      <div
        className="
          absolute bottom-0 left-0 right-0 z-30
          translate-y-1/2
          px-3 sm:px-5 lg:px-8
        "
      >
        <BookingBar />
      </div>
    </section>
  );
}