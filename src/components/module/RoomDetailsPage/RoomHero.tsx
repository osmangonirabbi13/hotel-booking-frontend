import Image from "next/image";

interface RoomHeroProps {
  title: string;
  image: string;
}

export function RoomHero({ title, image }: RoomHeroProps) {
  return (
    <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
      {image ? (
        <Image
          src={image}
          alt={title || "Room Detail Image"}
          fill
          unoptimized
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-stone-800" />
      )}

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex items-center justify-center">
        <h1
          className="text-white text-center px-4"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 400,
            letterSpacing: "0.01em",
            textShadow: "0 2px 16px rgba(0,0,0,0.35)",
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}