"use client";

import { useState } from "react";
import { Send, ArrowUpRight } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="bg-[#F9F8F6] py-20 px-4">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">

        {/* Icon */}
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#AA8453]">
          <Send className="h-5 w-5 -rotate-12 text-white" strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <h2 className="mb-8 font-serif text-3xl font-normal leading-snug text-[#1B1B1B] md:text-4xl">
          For Exclusive Offers and Updates Subscribe
          <br />
          Our SeaPearl Newsletter!
        </h2>

        {/* Input + Button */}
        {submitted ? (
          <p className="text-sm text-[#AA8453] font-medium tracking-wide">
            ✓ Thank you for subscribing!
          </p>
        ) : (
          <div className="flex w-full max-w-md overflow-hidden rounded-sm border border-[#1B1B1B]/20 bg-white">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter Your Email"
              className="flex-1 bg-transparent px-5 py-3.5 text-sm text-[#1B1B1B] placeholder-[#999] outline-none"
            />
            <div className="w-px self-stretch bg-[#1B1B1B]/15" />
            <button
              type="button"
              onClick={handleSubmit}
              className="flex shrink-0 items-center gap-1.5 px-5 text-sm font-semibold text-[#1B1B1B] transition hover:bg-[#1B1B1B] hover:text-white whitespace-nowrap"
            >
              Subscribe Now
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}