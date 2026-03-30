"use client";

import Image from "next/image";
import React, { useState } from "react";

export const dynamic = "force-dynamic";
const ContactPages = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
    >
      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "40vh", minHeight: "260px", maxHeight: "420px" }}
      >
        <Image
          src="https://i.ibb.co.com/nMt14g9S/z-Lm-Zon-Eb-UWmlgzq-OW1w-Ybh1m-Ks-Yt1jk5-YMG3z7c-A.jpg"
          alt="Seapearl Resort"
          fill
          className="object-cover object-center"
          priority
        />
        {/* very subtle left-side shadow only */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.1) 0%, transparent 55%)",
          }}
        />
        {/* Title — center of image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="text-4xl md:text-5xl font-light tracking-[0.12em] text-white"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              textShadow: "0 1px 14px rgba(0,0,0,0.2)",
            }}
          >
            Contact Us
          </h1>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">

          {/* Left: Form */}
          <div>
            <p
              className="text-[11px] tracking-[0.3em] text-stone-400 uppercase mb-4"
              style={{ fontFamily: "sans-serif" }}
            >
              Getting Touch
            </p>

            <h2
              className="font-light leading-tight text-stone-900 mb-5"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
              }}
            >
              Contact Seapearl
              <br />
              Resort Today
            </h2>

            <p
              className="text-sm text-stone-500 leading-relaxed mb-8"
              style={{ fontFamily: "sans-serif", maxWidth: "360px" }}
            >
              Reach out to us via phone, email, or through our convenient online
              form. We look forward to hearing from you and helping you plan
              your unforgettable experience at Seapearl Resort.
            </p>

            {submitted ? (
              <div className="rounded-lg border border-[#d4a574]/30 bg-[#fdf8f2] px-6 py-8 text-center">
                <p
                  className="text-lg text-stone-700"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Thank you for reaching out.
                </p>
                <p
                  className="text-sm text-stone-500 mt-1"
                  style={{ fontFamily: "sans-serif" }}
                >
                  We&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    className="block text-[12px] text-stone-600 mb-1.5"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-stone-200 rounded-sm px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:border-[#b8975a] transition-colors bg-white"
                    style={{ fontFamily: "sans-serif" }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-[12px] text-stone-600 mb-1.5"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-stone-200 rounded-sm px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:border-[#b8975a] transition-colors bg-white"
                    style={{ fontFamily: "sans-serif" }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-[12px] text-stone-600 mb-1.5"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Write Your Comment*
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full border border-stone-200 rounded-sm px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:border-[#b8975a] transition-colors bg-white resize-none"
                    style={{ fontFamily: "sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-sm px-6 py-3 text-[11px] font-medium tracking-[0.15em] text-white uppercase transition-opacity hover:opacity-90 active:opacity-80"
                  style={{
                    background: "#b8975a",
                    fontFamily: "sans-serif",
                  }}
                >
                  Send Message
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Right: Resort Image with decorative offset border frame */}
          <div className="relative hidden md:block" style={{ height: "480px" }}>
            {/* Decorative border — offset bottom-right */}
            <div
              className="absolute"
              style={{
                top: "18px",
                left: "18px",
                right: "0px",
                bottom: "0px",
                border: "1px solid rgba(184,151,90,0.4)",
                borderRadius: "2px",
                zIndex: 0,
              }}
            />
            {/* Image sits top-left, slightly inset from the border */}
            <div
              className="absolute overflow-hidden"
              style={{
                top: 0,
                left: 0,
                right: "18px",
                bottom: "18px",
                borderRadius: "2px",
                zIndex: 1,
              }}
            >
              <Image
                src="https://i.ibb.co.com/DD5FzNFR/2dg-PUe-Pj5soec3-Ww8-MV2ccl6-LFh-Wa-XMd-T4c-RUss-C.jpg"
                alt="Seapearl Resort Pool"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Mobile: image without frame */}
          <div className="relative md:hidden overflow-hidden rounded-sm" style={{ height: "300px" }}>
            <Image
              src="https://i.ibb.co.com/DD5FzNFR/2dg-PUe-Pj5soec3-Ww8-MV2ccl6-LFh-Wa-XMd-T4c-RUss-C.jpg"
              alt="Seapearl Resort Pool"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* ── Info Bar ────────────────────────────────────────────── */}
      <div className="border-t border-stone-100 py-12">
        <div className="mx-auto max-w-4xl px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* Address */}
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-full border border-stone-200"
              style={{ width: "58px", height: "58px" }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b6560"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="1" />
                <path d="M9 21V9h6v12" />
                <path d="M3 9h18" />
                <rect x="9.5" y="11.5" width="2" height="2" />
                <rect x="12.5" y="11.5" width="2" height="2" />
              </svg>
            </div>
            <div>
              <p
                className="font-medium text-stone-800 mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "17px",
                }}
              >
                SeaPearl Address
              </p>
              <p
                className="text-xs text-stone-400 leading-relaxed"
                style={{ fontFamily: "sans-serif" }}
              >
                452 15h Street, Office 741,
                <br />
                Ohio, De 47754, USA
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-full border border-stone-200"
              style={{ width: "58px", height: "58px" }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b6560"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="18" height="14" rx="1.5" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </div>
            <div>
              <p
                className="font-medium text-stone-800 mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "17px",
                }}
              >
                Email address
              </p>
              <p
                className="text-xs text-stone-400"
                style={{ fontFamily: "sans-serif" }}
              >
                info@seapearl.com
              </p>
            </div>
          </div>

          {/* Reservation */}
          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-full border border-stone-200"
              style={{ width: "58px", height: "58px" }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b6560"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6.6 4H5A1 1 0 004 5v1C4 14.39 9.61 20 18 20h1a1 1 0 001-1v-1.59a1 1 0 00-.76-.97l-3.13-.78a1 1 0 00-1.07.42l-.74 1.12A11.08 11.08 0 019.27 12l1.12-.74a1 1 0 00.42-1.07l-.78-3.13A1 1 0 009.06 6.3" />
                <path d="M15 5a5 5 0 010 10" strokeDasharray="2 2" />
                <circle cx="15" cy="5" r="0.5" fill="#6b6560" />
              </svg>
            </div>
            <div>
              <p
                className="font-medium text-stone-800 mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "17px",
                }}
              >
                For Reservation
              </p>
              <p
                className="text-xs text-stone-400"
                style={{ fontFamily: "sans-serif" }}
              >
                +21 454 451 2009
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPages;