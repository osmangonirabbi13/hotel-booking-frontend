"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

import { UserInfo } from "@/types/user.types";
import { logoutUser } from "@/services/auth.service";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ user }: { user: UserInfo | null }) {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Logout?",
        text: "Are you sure you want to exit?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Logout",
      });

      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Logging out...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const success = await logoutUser();

      if (success) {
        await Swal.fire({
          title: "Logged Out!",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });

        setProfileOpen(false);
        setMenuOpen(false);

        router.push("/login");
        router.refresh();
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);

      await Swal.fire({
        title: "Error!",
        text: "Something went wrong while logging out.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 transition-all duration-500 md:px-12 ${
          isSticky || menuOpen
            ? "bg-[#1B1B1B]/95 py-4 shadow-xl backdrop-blur-md"
            : "bg-gradient-to-b from-black/50 to-transparent py-6 lg:py-8"
        }`}
      >
        <Link
          href="/"
          className="text-2xl font-serif tracking-tight text-white lg:text-3xl"
        >
          SeaPearl
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className={`px-4 py-2 text-[11px] font-medium uppercase tracking-[2px] transition-colors ${
                  pathname === l.href
                    ? "text-[#C9A96E]"
                    : "text-white/90 hover:text-[#C9A96E]"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-8 lg:flex">
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-md border border-[#C9A96E]/50 px-4 py-2 text-sm text-white transition hover:border-[#C9A96E] hover:text-[#C9A96E]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C9A96E] text-black">
                  <User size={16} />
                </div>

                <span className="max-w-[120px] truncate">
                  {user.name || "Profile"}
                </span>

                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#121212] shadow-2xl">
                  <div className="border-b border-white/10 px-4 py-3">
                    <p className="text-sm font-semibold text-white">
                      {user.name || "User"}
                    </p>
                    <p className="truncate text-xs text-white/60">
                      {user.email || ""}
                    </p>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white transition hover:bg-white/10"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>

                    <Link
                      href="/my-profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-white transition hover:bg-white/10"
                    >
                      <User size={16} />
                      My Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-400 transition hover:bg-white/10"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[12px] uppercase tracking-wider text-white hover:text-[#C9A96E]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="border border-[#C9A96E] px-7 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#C9A96E] transition-all hover:bg-[#C9A96E] hover:text-black"
              >
                Register
              </Link>
            </>
          )}
        </div>

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
              {user ? (
                <>
                  <div className="rounded-md border border-white/10 px-3 py-3 text-white">
                    <p className="font-medium">{user.name || "User"}</p>
                    <p className="text-sm text-white/60">{user.email || ""}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md border border-[#C9A96E] px-3 py-2 text-center text-sm uppercase tracking-[1px] text-white hover:bg-[#C9A96E]/20"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md border border-[#C9A96E] px-3 py-2 text-center text-sm uppercase tracking-[1px] text-white hover:bg-[#C9A96E]/20"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-md border border-red-400 px-3 py-2 text-center text-sm uppercase tracking-[1px] text-red-400 hover:bg-red-400/10"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md border border-[#C9A96E] px-3 py-2 text-center text-sm uppercase tracking-[1px] text-white hover:bg-[#C9A96E]/20"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md border border-[#C9A96E] px-3 py-2 text-center text-sm uppercase tracking-[1px] text-white hover:bg-[#C9A96E]/20"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}