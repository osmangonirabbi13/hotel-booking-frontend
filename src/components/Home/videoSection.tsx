"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";


const YOUTUBE_VIDEO_ID = "s8vnc9l8sz4";

export default function VideoSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Banner */}
      <section
        className="relative w-full overflow-hidden cursor-pointer group"
        style={{ height: "clamp(280px, 45vw, 520px)" }}
        onClick={() => setModalOpen(true)}
      >
        {/* YouTube Thumbnail as background */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg')`,
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-300" />

        {/* SEAPEARL text + Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center select-none">

            {/* Hotel Name */}
            <h2
              className="font-serif text-[clamp(3rem,10vw,9rem)] font-normal text-white/75 mix-blend-overlay"
              style={{ letterSpacing: "0.2em" }}
            >
              SEAPEARL
            </h2>

            {/* Play Button */}
            <button
              aria-label="Play video"
              className="absolute flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-white/20 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/35 hover:scale-110"
            >
              <Play className="h-5 w-5 fill-white translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* YouTube Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute -top-12 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>

            {/* YouTube Embed */}
            <div className="relative overflow-hidden rounded-lg shadow-2xl" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Hotel Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}