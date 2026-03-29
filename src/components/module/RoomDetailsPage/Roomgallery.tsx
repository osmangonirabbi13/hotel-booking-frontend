import Image from "next/image";

interface RoomGalleryProps {
  images: string[];
}

export function RoomGallery({ images }: RoomGalleryProps) {
  if (!images || images.length === 0) return null;

  // Layout: 3 small thumbnails on left, 1 large on right
  const [large, ...thumbs] = images;

  return (
    <section className="w-full bg-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-[180px_1fr] gap-2 h-[420px]">

          {/* Left column: 3 stacked thumbnails */}
          <div className="flex flex-col gap-2">
            {thumbs.slice(0, 3).map((src, i) => (
              <div
                key={i}
                className="relative flex-1 overflow-hidden rounded-sm cursor-pointer group"
              >
                <Image
                  src={src}
                  alt={`Room image ${i + 2}`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
            {/* Fill empty slots if fewer than 3 thumbs */}
            {Array.from({ length: Math.max(0, 3 - thumbs.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="flex-1 bg-stone-100 rounded-sm" />
            ))}
          </div>

          {/* Right: large featured image */}
          <div className="relative overflow-hidden rounded-sm cursor-pointer group">
            <Image
              src={large}
              alt="Featured room image"
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}