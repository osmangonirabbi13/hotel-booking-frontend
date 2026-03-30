/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { CalendarDays, CreditCard, Users, BedDouble, CheckCircle2, Clock, MapPin, Hash } from "lucide-react";
import { IBooking } from "@/types/booking.types";

interface MyBookingDetailsProps {
  booking: IBooking;
}

const formatDate = (date: string | undefined) => {
  if (!date) return "N/A";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "Invalid Date";
  }
};

const formatShortDate = (date: string | undefined) => {
  if (!date) return { day: "--", month: "---", year: "----" };
  try {
    const d = new Date(date);
    return {
      day: d.toLocaleDateString("en-US", { day: "2-digit" }),
      month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      year: d.toLocaleDateString("en-US", { year: "numeric" }),
    };
  } catch {
    return { day: "--", month: "---", year: "----" };
  }
};

const formatUSD = (amount: number | undefined) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount || 0);

const statusConfig: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  CONFIRMED: {
    label: "Confirmed",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    cls: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  PENDING: {
    label: "Pending",
    icon: <Clock className="h-3.5 w-3.5" />,
    cls: "bg-amber-50 text-amber-700 border border-amber-200",
  },
};

const MyBookingDetails = ({ booking }: MyBookingDetailsProps) => {
  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center p-16 rounded-3xl bg-[#faf9f7] border border-stone-200">
        <BedDouble className="h-10 w-10 text-stone-300 mb-3" />
        <p className="text-stone-400 text-sm font-medium">No booking details available.</p>
      </div>
    );
  }

  const status = booking?.status || "PENDING";
  const sConfig = statusConfig[status] || statusConfig["PENDING"];
  const checkIn = formatShortDate(booking?.checkIn);
  const checkOut = formatShortDate(booking?.checkOut);

  return (
    <div className="font-['Instrument_Serif',_Georgia,_serif] space-y-4">

      {/* ── Top Hero Banner ─────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-3xl p-8 md:p-10"
        style={{
          background: "linear-gradient(135deg, #1c1917 0%, #292524 60%, #3b2f2a 100%)",
        }}
      >
        {/* decorative circles */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #d4a574 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #d4a574 0%, transparent 70%)" }} />

        <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
          <div className="space-y-1">
            <p className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-stone-400">
              Your Reservation
            </p>
            <h1 className="text-2xl md:text-3xl text-white leading-snug">
              {booking?.room?.roomTitle || "Accommodation"}
            </h1>
            <div className="flex items-center gap-1.5 text-stone-400 text-sm font-sans mt-1">
              <MapPin className="h-3.5 w-3.5 text-[#d4a574]" />
              <span>{booking?.guests || 1} Guest{(booking?.guests || 1) > 1 ? "s" : ""} · Standard Suite</span>
            </div>
          </div>

          <span className={`self-start inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-sans font-semibold ${sConfig.cls}`}>
            {sConfig.icon}
            {sConfig.label}
          </span>
        </div>

        {/* Date ribbon */}
        <div className="relative mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          {/* Check In */}
          <div className="rounded-2xl bg-white/8 border border-white/10 p-4 backdrop-blur-sm">
            <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400 mb-1">Check-in</p>
            <p className="text-3xl font-bold text-white leading-none">{checkIn.day}</p>
            <p className="text-xs font-sans text-[#d4a574] mt-0.5">{checkIn.month} {checkIn.year}</p>
          </div>

          {/* Divider */}
          <div className="flex flex-col items-center gap-1 text-stone-500">
            <div className="h-px w-8 bg-stone-600" />
            <BedDouble className="h-4 w-4" />
            <div className="h-px w-8 bg-stone-600" />
          </div>

          {/* Check Out */}
          <div className="rounded-2xl bg-white/8 border border-white/10 p-4 backdrop-blur-sm">
            <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400 mb-1">Check-out</p>
            <p className="text-3xl font-bold text-white leading-none">{checkOut.day}</p>
            <p className="text-xs font-sans text-[#d4a574] mt-0.5">{checkOut.month} {checkOut.year}</p>
          </div>
        </div>
      </div>

      {/* ── Bottom Two Columns ───────────────────────────────────── */}
      <div className="grid gap-4 lg:grid-cols-5">

        {/* Left: Stay Details */}
        <div className="lg:col-span-3 rounded-3xl border border-stone-200 bg-white p-6 space-y-5">
          <h2 className="text-lg text-stone-800 leading-none">Stay Details</h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <CalendarDays className="h-4 w-4" />, label: "Check-in", value: formatDate(booking?.checkIn) },
              { icon: <CalendarDays className="h-4 w-4" />, label: "Check-out", value: formatDate(booking?.checkOut) },
              { icon: <Users className="h-4 w-4" />, label: "Guests", value: `${booking?.guests || 0} Person${(booking?.guests || 0) > 1 ? "s" : ""}` },
              { icon: <BedDouble className="h-4 w-4" />, label: "Room", value: booking?.room?.roomTitle || "Standard Suite" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="rounded-2xl bg-stone-50 border border-stone-100 p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-stone-400 font-sans">
                  {icon}
                  <span className="text-[10px] uppercase tracking-widest font-semibold">{label}</span>
                </div>
                <p className="text-sm font-sans font-semibold text-stone-800 truncate">{value}</p>
              </div>
            ))}
          </div>

          {booking?.specialRequests && (
            <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
              <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-amber-700 mb-1.5">
                Special Requests
              </p>
              <p className="text-sm font-sans text-amber-900/80 leading-relaxed">
                {booking.specialRequests}
              </p>
            </div>
          )}
        </div>

        {/* Right: Payment Summary */}
        <div className="lg:col-span-2 rounded-3xl border border-stone-200 bg-white p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-lg text-stone-800 leading-none">Payment</h2>

            <div className="space-y-3">
              {[
                { label: "Total Amount", value: formatUSD(booking?.totalPrice), highlight: true },
                { label: "Payment Status", value: booking?.payment?.status || "PENDING",
                  valueClass: booking?.payment?.status === "PAID" ? "text-emerald-600" : "text-amber-600" },
                { label: "Booking Status", value: booking?.status || "PENDING" },
              ].map(({ label, value, highlight, valueClass }) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-stone-50 last:border-0">
                  <span className="font-sans text-xs text-stone-400 uppercase tracking-wide">{label}</span>
                  <span className={`font-sans text-sm font-bold ${highlight ? "text-stone-900" : valueClass || "text-stone-700"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {booking?.payment?.transactionId && (
              <div className="flex items-center gap-2 rounded-xl bg-stone-50 border border-stone-100 px-3.5 py-2.5">
                <Hash className="h-3.5 w-3.5 text-stone-300 flex-shrink-0" />
                <p className="font-mono text-[11px] text-stone-400 truncate">
                  {booking.payment.transactionId}
                </p>
              </div>
            )}
          </div>

          {/* Booking ID callout */}
          <div className="mt-5 rounded-2xl p-4 flex items-start gap-3"
            style={{ background: "linear-gradient(135deg, #1c1917, #3b2f2a)" }}>
            <CreditCard className="h-4 w-4 text-[#d4a574] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400 mb-0.5">
                Booking Reference
              </p>
              <p className="font-mono text-sm font-bold text-white">
                #{booking?.id?.slice(-8) || "--------"}
              </p>
              <p className="font-sans text-[10px] text-stone-500 mt-1 leading-snug">
                Show this ID at the front desk during check-in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingDetails;