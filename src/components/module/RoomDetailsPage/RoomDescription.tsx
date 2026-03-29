interface RoomDescriptionProps {
  description: string;
}

export function RoomDescription({ description }: RoomDescriptionProps) {
  return (
    <section className="w-full py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="text-stone-700 leading-relaxed"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
            fontWeight: 400,
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}