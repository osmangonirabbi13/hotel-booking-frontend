import Image from "next/image";

const RoomsHero = () => {
  return (
    <section className="relative h-[220px] w-full sm:h-[280px] md:h-[360px] lg:h-[420px] xl:h-[500px]">
      <Image
        src="/room-banner.png"
        alt="Choose Your Rooms"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
        
      </div>
    </section>
  );
};

export default RoomsHero;