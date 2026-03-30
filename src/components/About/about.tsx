import Image from "next/image";
import { Award, Users, MapPin, Star } from "lucide-react";

const stats = [
  { icon: Award, value: "15+", label: "Years of Excellence" },
  { icon: Users, value: "50K+", label: "Happy Guests" },
  { icon: MapPin, value: "3", label: "Prime Locations" },
  { icon: Star, value: "5", label: "Star Rated" },
];

const team = [
  {
    name: "James Whitmore",
    role: "General Manager",
    image: "https://i.ibb.co.com/sd4hhqkR/portrait-white-man-isolated.jpg",
  },
  {
    name: "Sofia Laurent",
    role: "Head Chef",
    image: "https://i.ibb.co.com/PsG9MrBZ/close-up-portrait-curly-handsome-european-male.jpg",
  },
  {
    name: "Arjun Mehta",
    role: "Guest Relations Director",
    image: "https://i.ibb.co.com/8LtdxbbM/closeup-young-female-professional-making-eye-contact-against-colored-background.jpg",
  },
];

const AboutPages = () => {
  return (
    <main className="bg-[#F9F8F6]">

      {/* ─── Hero ─── */}
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://i.ibb.co.com/zTJ7LDhQ/photo-1566073771259-6a8506099945.webp" }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#AA8453]">
            Our Story
          </p>
          <h1 className="font-serif text-5xl font-normal text-white md:text-6xl lg:text-7xl">
            About SeaPearl
          </h1>
        </div>
      </section>

      {/* ─── Story Section ─── */}
      <section className="mx-auto max-w-[1360px] px-4 py-24">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* Image */}
          <div className="relative">
            <div className="relative h-[520px] w-full overflow-hidden rounded-md">
              <Image
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&auto=format&fit=crop"
                alt="SeaPearl Interior"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 hidden flex-col items-center justify-center rounded-md bg-[#AA8453] px-8 py-6 text-center shadow-xl lg:flex">
              <span className="font-serif text-4xl font-normal text-white">15</span>
              <span className="mt-1 text-xs uppercase tracking-widest text-white/80">
                Years of<br />Excellence
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="lg:pl-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#AA8453]">
              Who We Are
            </p>
            <h2 className="mb-6 font-serif text-4xl font-normal leading-tight text-[#1B1B1B] md:text-5xl">
              A Legacy of Luxury &amp; Comfort
            </h2>
            <p className="mb-5 text-base leading-relaxed text-[#666]">
              Nestled along the pristine coastline, SeaPearl Hotel has been redefining
              luxury hospitality since 2009. Founded with a singular vision — to create
              an immersive sanctuary where the ocean meets elegance — we have grown to
              become one of the most coveted destinations for discerning travelers.
            </p>
            <p className="mb-10 text-base leading-relaxed text-[#666]">
              Every corner of SeaPearl is curated with intention. From our
              infinity pools that blend seamlessly into the horizon, to our
              world-class culinary experiences, we believe that true luxury lies
              in the details — and in the feeling of being genuinely cared for.
            </p>

            {/* Divider */}
            <div className="mb-10 h-px w-16 bg-[#AA8453]" />

            <blockquote className="border-l-2 border-[#AA8453] pl-6 italic text-[#888]">
              {/* "We don't just offer rooms — we craft memories that last a lifetime." */}
              <footer className="mt-2 text-sm font-semibold not-italic text-[#AA8453]">
                — James Whitmore, General Manager
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="bg-[#1B1B1B] py-20 px-4">
        <div className="mx-auto max-w-[1360px]">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <Icon className="mb-4 h-7 w-7 text-[#AA8453]" strokeWidth={1.5} />
                <span className="font-serif text-4xl font-normal text-white">{value}</span>
                <span className="mt-2 text-xs uppercase tracking-widest text-white/50">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section className="mx-auto max-w-[1360px] px-4 py-24">
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#AA8453]">
            Our Purpose
          </p>
          <h2 className="font-serif text-4xl font-normal text-[#1B1B1B] md:text-5xl">
            Mission &amp; Vision
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-md border border-[#AA8453]/20 bg-white p-10 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#AA8453]/10">
              <Award className="h-5 w-5 text-[#AA8453]" strokeWidth={1.5} />
            </div>
            <h3 className="mb-4 font-serif text-2xl font-normal text-[#1B1B1B]">Our Mission</h3>
            <p className="text-base leading-relaxed text-[#666]">
              To provide an unparalleled hospitality experience that honors the
              natural beauty of our surroundings while delivering world-class
              service, comfort, and personalized care to every guest who walks
              through our doors.
            </p>
          </div>
          <div className="rounded-md border border-[#AA8453]/20 bg-white p-10 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#AA8453]/10">
              <Star className="h-5 w-5 text-[#AA8453]" strokeWidth={1.5} />
            </div>
            <h3 className="mb-4 font-serif text-2xl font-normal text-[#1B1B1B]">Our Vision</h3>
            <p className="text-base leading-relaxed text-[#666]">
              To be recognized as the most beloved coastal luxury retreat in
              the region — a place where guests return not just for the
              facilities, but for the feeling of warmth, belonging, and
              extraordinary moments that define the SeaPearl experience.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Team ─── */}
      <section className="bg-white py-24 px-4">
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#AA8453]">
              The People Behind It
            </p>
            <h2 className="font-serif text-4xl font-normal text-[#1B1B1B] md:text-5xl">
              Meet Our Team
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="group text-center">
                <div className="relative mx-auto mb-5 h-64 w-64 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#1B1B1B]">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-[#AA8453]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default AboutPages;
