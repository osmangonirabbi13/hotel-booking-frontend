import { Utensils, Sprout, Dumbbell, Briefcase, WashingMachine, ConciergeBell } from "lucide-react";

const FEATURES = [
  {
    icon: <Utensils className="w-9 h-9 stroke-[1.2px]" />,
    title: "Restaurant & Bar",
    description: "Exceptional dining awaits at our resort. Immerse yourself in exquisite flavors with view to match. Pure indulgence, effortlessly delivered.",
  },
  {
    icon: <Sprout className="w-9 h-9 stroke-[1.2px]" />,
    title: "Spa & Wellness",
    description: "Discover serenity at our spa. Indulge in blissful treatments and unwind in a haven of relaxation. Your path to rejuvenation starts here.",
  },
  {
    icon: <Dumbbell className="w-9 h-9 stroke-[1.2px]" />,
    title: "Fitness Center",
    description: "Elevate your workout experience in our state-of-the-art gym, featuring modern equipment and a motivating coastal atmosphere.",
  },
  {
    icon: <Briefcase className="w-9 h-9 stroke-[1.2px]" />,
    title: "Conference Center",
    description: "Stay productive with our well-equipped business event center, offering essential services for business travelers.",
  },
  {
    icon: <WashingMachine className="w-9 h-9 stroke-[1.2px]" />,
    title: "Laundry Services",
    description: "Enjoy the luxury of professional garment care with our efficient laundry and pressing services, handled with utmost care.",
  },
  {
    icon: <ConciergeBell className="w-9 h-9 stroke-[1.2px]" />,
    title: "24/7 Room Service",
    description: "Delight in the convenience of round-the-clock room service, catering everything to your needs at any hour.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="w-full bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.4em] mb-5 font-light">
            Why Choose SeaPearl?
          </p>
          <h2 
            className="text-stone-800 leading-tight"
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "clamp(2rem, 4vw, 3rem)",
              maxWidth: "600px"
            }}
          >
            Unveiling Unmatched Coastal Luxury and Hospitality
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16">
          {FEATURES.map((feature, i) => (
            <div key={i} className="flex flex-col items-start group">
              {/* Icon */}
              <div className="text-[#B58E58] mb-6 transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 
                className="text-[#1C1C1C] mb-4"
                style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: "1.4rem",
                  fontWeight: 500
                }}
              >
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-stone-500 text-[15px] leading-[1.8] font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}