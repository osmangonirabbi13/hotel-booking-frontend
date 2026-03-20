"use client";

import Image from "next/image";
import { useState } from "react";

const gallery = [
  {
    id: 1,
    label: "Beach View",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    colSpan: "lg:col-span-2 lg:row-span-2", // large left
  },
  {
    id: 2,
    label: "Interior",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 3,
    label: "Pool Deck",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 4,
    label: "Dining",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 5,
    label: "Garden",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop",
    colSpan: "lg:col-span-1 lg:row-span-1",
  },
];

// Lightbox modal
function Lightbox({
  image,
  label,
  onClose,
}: {
  image: string;
  label: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-5xl w-full mx-4 overflow-hidden rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image}
          alt={label}
          width={1200}
          height={800}
          className="h-auto max-h-[85vh] w-full object-contain"
        />
        <p className="absolute bottom-4 left-4 font-serif text-lg text-white/80">
          {label}
        </p>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10 text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const [active, setActive] = useState<(typeof gallery)[0] | null>(null);

  return (
    <>
      <section className="bg-white pt-16 pb-0 px-4">
        <div className="mx-auto max-w-[1360px]">

          {/* Header */}
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#AA8453]">
              Exciting Gallery
            </p>
            <h2 className="font-serif text-4xl font-normal text-[#1B1B1B] md:text-5xl">
              Explore Unforgettable Experiences
            </h2>
          </div>
        </div>
      </section>

      {/* Full-width Grid — bleeds edge to edge */}
      <div className="w-full">
        <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-3 lg:grid-rows-2 gap-[3px]" style={{ height: "clamp(420px, 55vw, 680px)" }}>

          {/* Large left image */}
          <div
            className="relative col-span-2 row-span-1 lg:col-span-2 lg:row-span-2 cursor-pointer group overflow-hidden"
            onClick={() => setActive(gallery[0])}
          >
            <Image
              src={gallery[0].image}
              alt={gallery[0].label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
            {/* Label */}
            <span className="absolute bottom-5 left-5 font-serif text-lg text-white drop-shadow-md">
              {gallery[0].label}
            </span>
          </div>

          {/* Top right */}
          <div
            className="relative col-span-1 row-span-1 cursor-pointer group overflow-hidden"
            onClick={() => setActive(gallery[1])}
          >
            <Image
              src={gallery[1].image}
              alt={gallery[1].label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            <span className="absolute bottom-4 left-4 font-serif text-base text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
              {gallery[1].label}
            </span>
          </div>

          {/* Bottom right */}
          <div
            className="relative col-span-1 row-span-1 cursor-pointer group overflow-hidden"
            onClick={() => setActive(gallery[2])}
          >
            <Image
              src={gallery[2].image}
              alt={gallery[2].label}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            <span className="absolute bottom-4 left-4 font-serif text-base text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
              {gallery[2].label}
            </span>
          </div>

        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <Lightbox
          image={active.image}
          label={active.label}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
