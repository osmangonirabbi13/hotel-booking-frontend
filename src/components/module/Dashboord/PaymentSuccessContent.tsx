"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, CreditCard, ReceiptText, ArrowRight, Home } from "lucide-react";

function formatLabel(value: string | null, fallback = "N/A") {
  if (!value) return fallback;
  return value;
}

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("booking_id");
  const paymentId = searchParams.get("payment_id");

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-green-50 via-white to-white px-4 py-10 md:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-8 text-white md:px-10">
            <div className="mb-4 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 ring-8 ring-white/10">
                <CheckCircle2 className="h-10 w-10" />
              </div>
            </div>

            <h1 className="text-center text-2xl font-bold md:text-3xl">
              Payment Successful
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-white/90 md:text-base">
              Your payment has been completed successfully. Your booking has been recorded,
              and you can now review the booking details from your dashboard.
            </p>
          </div>

          <div className="px-6 py-8 md:px-10">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <div className="mb-3 flex items-center gap-2 text-stone-500">
                  <ReceiptText className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Booking ID
                  </span>
                </div>
                <p className="break-all text-sm font-medium text-stone-800 md:text-base">
                  {formatLabel(bookingId)}
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <div className="mb-3 flex items-center gap-2 text-stone-500">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Payment ID
                  </span>
                </div>
                <p className="break-all text-sm font-medium text-stone-800 md:text-base">
                  {formatLabel(paymentId)}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">
              <h2 className="text-base font-semibold text-stone-800">
                What happens next?
              </h2>

              <div className="mt-4 grid gap-3 text-sm text-stone-600">
                <div className="rounded-xl bg-white px-4 py-3">
                  Your booking confirmation is now linked to your account.
                </div>
                <div className="rounded-xl bg-white px-4 py-3">
                  You can review the booking status and payment details anytime.
                </div>
                <div className="rounded-xl bg-white px-4 py-3">
                  Keep your booking and payment IDs for quick support reference.
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={bookingId ? `/dashboard/my-bookings` : "/dashboard/my-bookings"}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
              >
                View Booking
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                Go Home
                <Home className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}