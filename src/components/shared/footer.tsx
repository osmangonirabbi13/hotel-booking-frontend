"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronUp } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Booking", href: "/booking" },
  { label: "SPA & Wellness", href: "/spa" },
  { label: "Restaurant", href: "/restaurant" },
  { label: "News & Media", href: "/news" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#1A1A1A] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-[1360px] px-4 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div>
            <h3 className="mb-5 font-serif text-2xl font-normal text-white">
              SeaPearl
            </h3>
            <p className="text-sm leading-relaxed text-white/50">
              Welcome to Seapearl, where coastal luxury meets unparallel
              hospitality.
            </p>
          </div>

          {/* Col 2 — Contact */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <h4 className="text-sm font-semibold text-white">Contact Us</h4>
              <div className="h-px flex-1 bg-white/20" />
            </div>
            <address className="not-italic space-y-3 text-sm text-white/50">
              <p>452 15h Street, Office 741, Ohio,<br />De 47754, USA</p>
              <p>
                <span className="font-medium text-white/70">Call :</span>{" "}
                +00(244)14-50-774
              </p>
              <p>
                <span className="font-medium text-white/70">Email :</span>{" "}
                info@oceanpearl.com
              </p>
            </address>
          </div>

          {/* Col 3 — Links */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <h4 className="text-sm font-semibold text-white">Links</h4>
              <div className="h-px flex-1 bg-white/20" />
            </div>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Subscribe */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <h4 className="text-sm font-semibold text-white">Subscribe</h4>
              <div className="h-px flex-1 bg-white/20" />
            </div>

            {/* Email Input */}
            <div className="flex overflow-hidden rounded-sm border border-white/15">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 outline-none"
              />
              <button
                type="button"
                className="flex shrink-0 items-center gap-1.5 bg-white/10 px-4 text-xs font-semibold text-white transition hover:bg-white/20 whitespace-nowrap"
              >
                Subscribe Now
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-white/40">
              Stay in the Loop &amp; unlock exclusive Experiences.
              Subscribe for Exclusive Updates and Offers!
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-white/50 hover:text-white"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1360px] items-center justify-between px-4 py-5">
          <p className="text-xs text-white/40">
            OceanPearl Copyright © 2024 Laralink
          </p>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-white/50 hover:text-white"
          >
            <ChevronUp className="h-4 w-4" />
          </button>

          <Link
            href="/privacy"
            className="text-xs text-white/40 transition hover:text-white"
          >
            Privacy &amp; Cookie Policy
          </Link>
        </div>
      </div>

    </footer>
  );
}