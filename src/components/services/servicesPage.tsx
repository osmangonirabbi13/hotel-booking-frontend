"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";


/* ─── SVG icons (larger) ─────────────────────────────────── */
const IconRestaurant = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#b8975a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18M3 9c3 0 6-2 6-6M15 3v4a3 3 0 006 0V3M18 10v11" />
  </svg>
);
const IconSpa = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#b8975a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C6 22 2 17 2 12c0-2 1-5 4-7 0 3 2 5 6 5s6-2 6-5c3 2 4 5 4 7 0 5-4 10-10 10z" />
  </svg>
);
const IconFitness = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#b8975a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4v16M18 4v16M2 9h4M18 9h4M2 15h4M18 15h4M6 12h12" />
  </svg>
);
const IconPool = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#b8975a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    <circle cx="12" cy="8" r="3" />
    <path d="M12 5V3" />
  </svg>
);
const IconConference = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#b8975a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);
const IconWifi = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#b8975a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0" />
    <circle cx="12" cy="20" r="1" fill="#b8975a" />
  </svg>
);
const IconAirport = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#b8975a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7 4.8 5.2 3.4 6.6l7 4-2 3-4-1-1.4 1.4L6 16l2 2 1.4-1.4-1-4 3-2 4 7 1.4-1.4z" />
  </svg>
);
const IconLaundry = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#b8975a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="3" />
    <circle cx="12" cy="13" r="4" />
    <path d="M6 6h.01M9 6h.01" />
  </svg>
);
const IconRoom = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#b8975a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <path d="M9 22V12h6v10" />
  </svg>
);

const services = [
  { icon: <IconRestaurant />, title: "Restaurant & Bar", desc: "Exceptional dining awaits you at our resort. Immerse yourself in a dining experience where fresh, locally sourced ingredients are thoughtfully prepared." },
  { icon: <IconSpa />, title: "Spa & Wellness", desc: "Immerse yourself in our top-of-the-line spa and wellness services. A haven of relaxation and renewal to help you rejuvenate mind, body and soul." },
  { icon: <IconFitness />, title: "Fitness Center", desc: "An exceptional fitness journey awaits you at our resort. Immerse yourself in a fitness experience, allowing yourself to achieve your fitness goals." },
  { icon: <IconPool />, title: "Infinity Pool", desc: "Our Infinity Pool feature is second to none. Enjoy a refreshing dip, relax poolside and appreciate breathtaking views. A place to relax, enjoy the tranquil atmosphere." },
  { icon: <IconConference />, title: "Conference Center", desc: "Find the right environment for your most important business endeavors. Seize ideas, ensuring seamless service for business travelers." },
  { icon: <IconWifi />, title: "Wifi & Internet", desc: "Delight in the convenience of our round-the-clock front desk service, catering to any inquiry according to your needs at any time." },
  { icon: <IconAirport />, title: "Airport Pick-up", desc: "Our Infinity Pool feature is second to none. Enjoy a refreshing dip and appreciate breathtaking views. A place to relax, enjoy the infinity atmosphere." },
  { icon: <IconLaundry />, title: "Laundry Services", desc: "Exceptional service designed to assist the client. Guest needs, catering to each client needs, ensuring you stay comfy and your wardrobe is spotless." },
  { icon: <IconRoom />, title: "24/7 Room Service", desc: "Delight in the convenience of our round-the-clock room service, catering to any culinary craving or request throughout the day and night." },
];

const faqs = [
  { q: "What are the check-in and check-out times at Seapearl?", a: "Check-in is from 3:00 PM and check-out is by 11:00 AM. Early check-in and late check-out may be available upon request." },
  { q: "Is parking available, and is there a fee?", a: "Yes, complimentary parking is available for all guests on-site." },
  { q: "Are pets allowed at Seapearl?", a: "We are a pet-friendly resort. Please contact us in advance to arrange pet accommodations." },
  { q: "Is there a dress code for the restaurant?", a: "We recommend smart casual attire for dining. Swimwear is not permitted in the restaurant." },
  { q: "Is Wi-Fi provided, and is it complimentary?", a: "High-speed Wi-Fi is complimentary throughout the resort for all guests." },
  { q: "Do you have facilities for business meetings or events?", a: "Yes, our Conference Center is fully equipped with modern AV facilities for meetings and events of all sizes." },
  { q: "Is direct beach access available from the hotel?", a: "Yes, guests enjoy exclusive direct access to our private beach at any time." },
];

const ServicesPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");

  return (
    <div className="bg-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>

      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "55vh", minHeight: "360px", maxHeight: "580px" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80"
          alt="Seapearl Services"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0" style={{ background: "rgba(20,18,14,0.52)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="font-light tracking-[0.16em] text-white"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              textShadow: "0 2px 20px rgba(0,0,0,0.35)",
            }}
          >
            Services
          </h1>
        </div>
      </div>

      {/* ── 2. Services Grid ────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-10 py-20 md:py-28">
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-4"
            style={{ fontFamily: "sans-serif" }}
          >
            Why Choose Seapearl
          </p>
          <h2
            className="font-light text-stone-900 leading-snug"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Unveiling Unmatched Coastal
            <br />
            Luxury and Hospitality
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-14 gap-y-14">
          {services.map((s) => (
            <div key={s.title}>
              <div className="mb-4">{s.icon}</div>
              <h3
                className="font-semibold text-stone-800 mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "19px",
                }}
              >
                {s.title}
              </h3>
              <p
                className="text-stone-400 leading-relaxed"
                style={{ fontFamily: "sans-serif", fontSize: "14px" }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Casabalina Full-width Banner ─────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "48vh", minHeight: "300px", maxHeight: "500px" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
          alt="Casabalina Restaurant"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "rgba(10,8,5,0.50)" }} />
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center rounded-full border-2 border-white/70 cursor-pointer hover:border-white hover:scale-105 transition-all"
            style={{ width: "74px", height: "74px" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </div>
        </div>
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            className="text-white/10 font-light tracking-[0.55em] uppercase"
            style={{
              fontSize: "clamp(3rem, 10vw, 7.5rem)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            CASABALINA
          </span>
        </div>
      </div>

      {/* ── 4. Restaurant Feature ───────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image left */}
          <div
            className="relative overflow-hidden rounded-sm"
            style={{ height: "460px" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
              alt="Restaurant & Bar"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex items-center justify-center rounded-full cursor-pointer hover:scale-105 transition-transform"
                style={{ width: "66px", height: "66px", background: "rgba(255,255,255,0.92)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#1c1917">
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              </div>
            </div>
          </div>

          {/* Text right */}
          <div>
            <p
              className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-4"
              style={{ fontFamily: "sans-serif" }}
            >
              Restaurant &amp; Bar
            </p>
            <h2
              className="font-light leading-snug text-stone-900 mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 3.5vw, 2.9rem)",
              }}
            >
              Casabelia Elegance,
              <br />
              Savory Indulgence at
              <br />
              Our Cuisine &amp; Bar
            </h2>
            <p
              className="text-stone-500 leading-relaxed mb-8"
              style={{ fontFamily: "sans-serif", fontSize: "15px" }}
            >
              Step into the refined world of Casabelia, where our restaurant promises a culinary experience like no other. Immerse yourself in the rich dining, true craftsmanship, handcrafted dishes with our traditional resort. Casabelia offers a sophisticated atmosphere offering impeccable dishes with a breathtaking aquarium.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-sm px-7 py-3.5 text-xs font-medium tracking-[0.16em] text-white uppercase hover:opacity-90 transition-opacity"
              style={{ background: "#b8975a", fontFamily: "sans-serif" }}
            >
              Learn More
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. Conference Feature ───────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-10 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text left */}
          <div>
            <p
              className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-4"
              style={{ fontFamily: "sans-serif" }}
            >
              Conference Hall
            </p>
            <h2
              className="font-light leading-snug text-stone-900 mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 3.5vw, 2.9rem)",
              }}
            >
              Seapearl Meeting
              <br />
              Oasis: Where Ideas
              <br />
              Flourish
            </h2>
            <p
              className="text-stone-500 leading-relaxed mb-8"
              style={{ fontFamily: "sans-serif", fontSize: "15px" }}
            >
              Experience a space designed for success at Seapearl s Conference Hall, where our venue provides the ideal setting for your meetings, conferences, and corporate events. Our hall comfortably accommodates groups of all sizes and comes equipped with state-of-the-art facilities to host.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-sm px-7 py-3.5 text-xs font-medium tracking-[0.16em] text-white uppercase hover:opacity-90 transition-opacity"
              style={{ background: "#b8975a", fontFamily: "sans-serif" }}
            >
              Learn More
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Image right */}
          <div
            className="relative overflow-hidden rounded-sm"
            style={{ height: "460px" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80"
              alt="Conference Center"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex items-center justify-center rounded-full cursor-pointer hover:scale-105 transition-transform"
                style={{ width: "66px", height: "66px", background: "rgba(255,255,255,0.92)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#1c1917">
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Newsletter Banner ────────────────────────────────── */}
      <section className="relative w-full overflow-hidden py-24 md:py-32">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
          alt="Newsletter background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "rgba(15,12,8,0.68)" }} />
        <div className="relative mx-auto max-w-2xl px-10 text-center">
          <h2
            className="font-light text-white leading-snug mb-10"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            }}
          >
            For Exclusive Offers and Updates Subscribe
            <br />
            Our SeaPearl Newsletter!
          </h2>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 rounded-sm px-5 py-3 text-sm text-stone-800 focus:outline-none"
              style={{ fontFamily: "sans-serif", minWidth: 0 }}
            />
            <select
              className="rounded-sm px-5 py-3 text-sm text-stone-800 focus:outline-none bg-white"
              style={{ fontFamily: "sans-serif" }}
            >
              <option>Subscribe for...</option>
              <option>Exclusive Offers</option>
              <option>Latest Updates</option>
              <option>Events &amp; News</option>
            </select>
            <button
              type="submit"
              className="rounded-sm px-7 py-3 text-xs font-medium tracking-[0.16em] text-white uppercase hover:opacity-90 transition-opacity"
              style={{ background: "#b8975a", fontFamily: "sans-serif", whiteSpace: "nowrap" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ── 7. FAQ ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-[0.3em] text-stone-400 uppercase mb-4"
            style={{ fontFamily: "sans-serif" }}
          >
            FAQ
          </p>
          <h2
            className="font-light text-stone-900"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Explore Our Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Resort image */}
          <div
            className="relative overflow-hidden rounded-sm"
            style={{ height: "480px" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80"
              alt="Seapearl Resort FAQ"
              fill
              className="object-cover"
            />
          </div>

          {/* Accordion */}
          <div className="divide-y divide-stone-100">
            {faqs.map((faq, i) => (
              <div key={i} className="py-4">
                <button
                  className="w-full flex items-start justify-between gap-4 text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span
                    className="font-medium text-stone-700 group-hover:text-[#b8975a] transition-colors"
                    style={{ fontFamily: "sans-serif", fontSize: "14px" }}
                  >
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0 mt-0.5 text-stone-400">
                    {openFaq === i ? (
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                </button>
                {openFaq === i && (
                  <p
                    className="mt-3 text-stone-400 leading-relaxed"
                    style={{ fontFamily: "sans-serif", fontSize: "13px" }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default ServicesPage;