/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { format, addDays } from "date-fns";
import Swal from "sweetalert2";

import { IRoom } from "@/types/room.types";
import { createBooking } from "@/services/booking.service";
import { IBookBookingPayload } from "@/types/booking.types";

interface RoomAboutReservationProps {
  room: IRoom;
}

export function RoomAboutReservation({
  room,
}: RoomAboutReservationProps) {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const tomorrowStr = format(addDays(new Date(), 1), "yyyy-MM-dd");

  const [checkIn, setCheckIn] = useState(todayStr);
  const [checkOut, setCheckOut] = useState(tomorrowStr);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [extras, setExtras] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleExtra = (id: string) => {
    setExtras((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

const handleBooking = async () => {
  const totalGuests = adults + children;
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  try {
    setLoading(true);

    const payload: IBookBookingPayload = {
      roomId: room.id,
      checkIn: checkInDate.toISOString(),
      checkOut: checkOutDate.toISOString(),
      guests: totalGuests,
      adults,
      children,
      extraServiceIds: extras,
    };

    const response = await createBooking(payload);

    // According to your log, the response itself contains paymentUrl
    // We check both the mapped response and the raw response structure
    const paymentUrl = response?.paymentUrl;

    if (paymentUrl) {
      window.location.href = paymentUrl;
      return;
    }

    // Fallback if paymentUrl is missing despite a successful request
    Swal.fire({
      title: "Booking Created",
      text: "Booking successful, but we couldn't redirect to payment. Please check your dashboard.",
      icon: "info",
      confirmButtonColor: "#a28051",
    });

  } catch (error: any) {
    console.error("Catch Error:", error);

    // Extract the specific message from the backend (e.g., "This room is already booked...")
    const serverMessage = error?.response?.data?.error || 
                          error?.response?.data?.message || 
                          error?.message || 
                          "Something went wrong.";

    Swal.fire({
      title: "Booking Failed",
      text: serverMessage,
      icon: "error",
      confirmButtonColor: "#a28051",
    });
} finally {
    setLoading(false);
  }
};

  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(room.rent || 0);

  const amenities = room.amenities ?? [];
  const extraServices = room.extraServices ?? [];

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-start">
        <div>
          <h2
            className="text-stone-800 mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              fontWeight: 400,
            }}
          >
            About Accommodation
          </h2>

          <p className="text-stone-500 text-sm leading-relaxed mb-10 max-w-2xl">
            {room.description ||
              "Relax in our cozy, compact room featuring modern amenities and premium comfort."}
          </p>

          <h3
            className="text-stone-800 mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
            }}
          >
            Amenities
          </h3>

          <div className="grid grid-cols-2 gap-y-4 gap-x-12">
            {amenities.map(({ amenity }: any) => (
              <div
                key={amenity.id}
                className="flex items-center gap-3 text-stone-500 text-[15px]"
              >
                {amenity.icon ? (
                  <div className="relative w-5 h-5 opacity-70">
                    <Image
                      src={amenity.icon}
                      alt={amenity.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                )}
                {amenity.title}
              </div>
            ))}
          </div>
        </div>

        <div
          className="rounded-sm p-8 shadow-2xl"
          style={{ backgroundColor: "#a28051" }}
        >
          <div className="flex items-baseline justify-between mb-10">
            <h2
              className="text-white text-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Reservation
            </h2>

            <div className="text-right">
              <p className="text-white/80 text-xs uppercase tracking-widest mb-1">
                From
              </p>
              <p
                className="text-white text-3xl font-medium"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                $ {formattedPrice}{" "}
                <span className="text-lg font-normal opacity-90">/ Night</span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative border border-white/40 rounded-sm">
              <label className="absolute -top-2 left-3 bg-[#a28051] px-1 text-[10px] text-white uppercase tracking-tighter">
                Check in :
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-transparent text-white p-3 outline-none"
                style={{ colorScheme: "dark" }}
              />
            </div>

            <div className="relative border border-white/40 rounded-sm">
              <label className="absolute -top-2 left-3 bg-[#a28051] px-1 text-[10px] text-white uppercase tracking-tighter">
                Check out :
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-transparent text-white p-3 outline-none"
                style={{ colorScheme: "dark" }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative border border-white/40 rounded-sm">
                <label className="absolute -top-2 left-3 bg-[#a28051] px-1 text-[10px] text-white uppercase tracking-tighter">
                  Adults :
                </label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full bg-transparent text-white p-3 outline-none appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n} className="text-black">
                      {n.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative border border-white/40 rounded-sm">
                <label className="absolute -top-2 left-3 bg-[#a28051] px-1 text-[10px] text-white uppercase tracking-tighter">
                  Children :
                </label>
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full bg-transparent text-white p-3 outline-none appearance-none"
                >
                  {[0, 1, 2, 3, 4].map((n) => (
                    <option key={n} value={n} className="text-black">
                      {n.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {extraServices.length > 0 && (
              <div className="pt-4">
                <h4
                  className="text-white text-xl mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Extra Services
                </h4>

                <div className="space-y-3">
                  {extraServices.map(({ extraService }: any) => (
                    <div
                      key={extraService.id}
                      className="flex items-center justify-between group"
                    >
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={extras.includes(extraService.id)}
                          onChange={() => toggleExtra(extraService.id)}
                          className="w-4 h-4 border-white/40 bg-transparent accent-white"
                        />
                        <span className="text-white text-sm">
                          {extraService.serviceName}
                        </span>
                      </label>

                      <span className="text-white/90 text-xs font-bold">
                        $ {extraService.serviceAmount}.00
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleBooking}
              disabled={loading}
              className="w-full bg-[#1c1c1c] text-white py-4 mt-6 text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors disabled:opacity-50"
            >
              {loading ? "Processing..." : "Process to book"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}