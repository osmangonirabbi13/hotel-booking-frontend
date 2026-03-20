"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 transition-all duration-500 md:px-12 ${
        isSticky || menuOpen ? "bg-[#1B1B1B]/95 py-4 shadow-xl backdrop-blur-md" : "bg-gradient-to-b from-black/50 to-transparent py-6 lg:py-8"
      }`}>
        <Link href="/" className="text-2xl font-serif tracking-tight text-white lg:text-3xl">SeaPearl</Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className={`px-4 py-2 text-[11px] font-medium uppercase tracking-[2px] transition-colors ${
                pathname === l.href ? "text-[#C9A96E]" : "text-white/90 hover:text-[#C9A96E]"
              }`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/login" className="text-[12px] uppercase tracking-wider text-white hover:text-[#C9A96E]">Login</Link>
          <button className="border border-[#C9A96E] px-7 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#C9A96E] transition-all hover:bg-[#C9A96E] hover:text-black">
            Reservation
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="absolute right-0 top-0 h-full w-[80vw] max-w-xs bg-[#121212] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xl font-semibold tracking-tight text-white">
                SeaPearl
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium uppercase tracking-[2px] text-white hover:bg-[#C9A96E]/10"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-md border border-[#C9A96E] px-3 py-2 text-center text-sm uppercase tracking-[1px] text-white hover:bg-[#C9A96E]/20"
              >
                Login
              </Link>

              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-md border border-[#C9A96E] px-3 py-2 text-sm font-semibold uppercase tracking-[1px] text-[#C9A96E] transition hover:bg-[#C9A96E] hover:text-black"
              >
                Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}