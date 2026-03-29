"use client";

export default function WhyChooseSection() {
  return (
    <section
      className="
        bg-[#f7f7f5]
        px-4
        pt-16 pb-16
        sm:px-6 sm:pt-20 sm:pb-16
        lg:px-8 lg:pt-16 lg:pb-16
      "
    >
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-6 text-[11px] font-medium uppercase tracking-[4px] text-[#8c7554]">
          Why Choose Us
        </p>

        <h2
          className="
            mx-auto max-w-5xl
            font-light leading-[1.12] text-[#1b1b1b]
          "
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(34px, 5.5vw, 76px)",
          }}
        >
          Curated to match your preferences and desires, our selection
          includes luxury resorts, exclusive tours, and transfers for an
          unparalleled experience
        </h2>

        <button
          type="button"
          className="
            mt-10 inline-flex items-center gap-2
            rounded-md border border-[#1b1b1b]
            px-7 py-4 text-sm font-medium text-[#1b1b1b]
            transition hover:bg-[#1b1b1b] hover:text-white
          "
        >
          Learn More
          <span>↗</span>
        </button>
      </div>
    </section>
  );
}