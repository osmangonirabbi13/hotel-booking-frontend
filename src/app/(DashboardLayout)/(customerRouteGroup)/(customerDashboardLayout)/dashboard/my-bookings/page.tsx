/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMyBookings } from "@/services/booking.service";
import Link from "next/link";

export const dynamic = "force-dynamic";
const formatDate = (date: string) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

const formatUSD = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount || 0);

const getStatusStyles = (status: string | undefined) => {
  const s = status?.toUpperCase();
  if (s === "PAID" || s === "CONFIRMED" || s === "COMPLETED")
    return "bg-[#EAF3DE] text-[#27500A] border-[#97C459]";
  if (s === "PENDING")
    return "bg-[#FAEEDA] text-[#633806] border-[#EF9F27]";
  if (s === "CANCELLED" || s === "FAILED")
    return "bg-[#FCEBEB] text-[#791F1F] border-[#F09595]";
  return "bg-[#F1EFE8] text-[#444441] border-[#B4B2A9]";
};

const getDotColor = (status: string | undefined) => {
  const s = status?.toUpperCase();
  if (s === "PAID" || s === "CONFIRMED" || s === "COMPLETED") return "bg-[#3B6D11]";
  if (s === "PENDING") return "bg-[#854F0B]";
  if (s === "CANCELLED" || s === "FAILED") return "bg-[#A32D2D]";
  return "bg-[#5F5E5A]";
};

const MyBookingsPage = async () => {
  try {
    const bookingRes = await getMyBookings();
    const bookings = Array.isArray(bookingRes) ? bookingRes : (bookingRes as any)?.data || [];

    const totalSpent = bookings.reduce((sum: number, b: any) => sum + (b.totalPrice || 0), 0);
    const upcoming = bookings.filter(
      (b: any) => b.status?.toUpperCase() === "CONFIRMED" || b.status?.toUpperCase() === "PENDING"
    ).length;

    return (
      <div className="min-h-screen bg-stone-50 p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-6">

          {/* Page header */}
          <div>
            <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">My bookings</h1>
            <p className="mt-1 text-sm text-stone-500">All your reservations in one place</p>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total bookings", value: bookings.length },
              { label: "Total spent", value: formatUSD(totalSpent) },
              { label: "Upcoming stays", value: upcoming },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-white border border-stone-200/80 px-5 py-4">
                <p className="text-xs text-stone-400 font-medium uppercase tracking-wider mb-1.5">{label}</p>
                <p className="text-2xl font-semibold text-stone-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          {bookings.length === 0 ? (
            <div className="rounded-2xl border border-stone-200 bg-white p-16 text-center">
              <p className="text-stone-400 text-sm">No bookings found.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-stone-100 bg-stone-50/60">
                      {["Booking ID", "Room", "Dates", "Total", "Status", "Payment", ""].map((h, i) => (
                        <th
                          key={i}
                          className={`px-5 py-3.5 text-[10px] font-semibold uppercase tracking-widest text-stone-400 ${
                            i >= 4 ? "text-center" : "text-left"
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking: any, idx: number) => (
                      <tr
                        key={booking.id}
                        className={`border-b border-stone-100 last:border-0 hover:bg-stone-50/50 transition-colors ${
                          idx % 2 === 0 ? "" : "bg-stone-50/20"
                        }`}
                      >
                      
                        <td className="px-5 py-4 font-mono text-[11px] text-stone-400">
                          #{booking.id?.slice(-8)}
                        </td>

                        
                        <td className="px-5 py-4 font-medium text-stone-800 max-w-[180px] truncate">
                          {booking.room?.roomTitle || "Standard Room"}
                        </td>

                        
                        <td className="px-5 py-4 text-[12px] text-stone-500 whitespace-nowrap">
                          {formatDate(booking.checkIn)}
                          <span className="mx-1.5 text-stone-300">—</span>
                          {formatDate(booking.checkOut)}
                        </td>

                        
                        <td className="px-5 py-4 font-semibold text-stone-900 tabular-nums">
                          {formatUSD(booking.totalPrice)}
                        </td>

                        
                        <td className="px-5 py-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyles(
                              booking.status
                            )}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${getDotColor(booking.status)}`} />
                            {booking.status || "PENDING"}
                          </span>
                        </td>

                        {/* Payment Status */}
                        <td className="px-5 py-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyles(
                              booking.payment?.status
                            )}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full shrink-0 ${getDotColor(booking.payment?.status)}`}
                            />
                            {booking.payment?.status || "PENDING"}
                          </span>
                        </td>

                        {/* View Details */}
                        <td className="px-5 py-4 text-center">
                          <Link
                            href={`/dashboard/my-bookings/${booking.id}`}
                            className="inline-block rounded-lg border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-colors"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-red-100 bg-red-50 m-6">
        <p className="text-sm text-red-500">Something went wrong loading your bookings.</p>
      </div>
    );
  }
};

export default MyBookingsPage;