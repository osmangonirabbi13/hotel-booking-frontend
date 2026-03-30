/* eslint-disable @typescript-eslint/no-explicit-any */
import MyBookingDetails from "@/components/module/Booking/MyBookingDetails";
import { getMySingleBooking } from "@/services/booking.service";
import Link from "next/link";

interface MyBookingPageProps {
  params: Promise<{ id: string }>;
}

const MyBookingPage = async ({ params }: MyBookingPageProps) => {
  const { id } = await params;

  try {
    const response = await getMySingleBooking(id);
    
    const booking = response?.data || response;

    if (!booking || !booking.id) {
      throw new Error("Booking not found");
    }

    return (
      <div className="min-h-screen bg-stone-50 p-4 md:p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-stone-800 font-serif">Booking Details</h1>
            <Link href="/dashboard/my-bookings" className="text-sm font-medium text-stone-500 hover:text-black">
              &larr; Back to List
            </Link>
          </div>
          <MyBookingDetails booking={booking} />
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <div className="text-red-500 text-6xl mb-4">!</div>
        <h2 className="text-xl font-bold text-stone-800">Something Went Wrong</h2>
        <p className="text-stone-500 mt-2 text-center max-w-md">
          {error.message || "We are having trouble fetching your booking data."}
        </p>
        <div className="mt-8 flex gap-4">
          <Link 
            href="/dashboard/my-bookings" 
            className="px-8 py-3 bg-stone-900 text-white rounded-lg text-sm font-medium"
          >
            Back to My Bookings
          </Link>
          <Link 
            href={`/dashboard/my-bookings/${id}`}
            className="px-8 py-3 border border-stone-200 rounded-lg text-sm font-medium hover:bg-stone-50"
          >
            Retry
          </Link>
        </div>
      </div>
    );
  }
};

export default MyBookingPage;