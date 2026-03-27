"use client";

import BookingStatusDistribution from "@/components/shared/bookingStatusDistribution";
import StatsCard from "@/components/shared/StatsCard";
import { getDashboardData } from "@/services/dashboard.service";
import { ApiResponse } from "@/types/api.types";
import { ICustomerDashboardData } from "@/types/dashboard.types";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const CustomerDashboardContent = () => {
  const { data: customerDashboardData, isLoading } = useQuery({
    queryKey: ["customer-dashboard-data"],
    queryFn: getDashboardData,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 2,
  });

  const response = customerDashboardData as unknown as ApiResponse<ICustomerDashboardData>;
  const data = response?.data;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-white dark:bg-slate-900">
        {/* Outer Spinning Ring */}
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Loading...
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Bookings"
          value={data?.totalBookings || 0}
          iconName="CalendarDays"
          description="Total number of bookings"
        />

        <StatsCard
          title="Upcoming Bookings"
          value={data?.upcomingBookings || 0}
          iconName="CalendarRange"
          description="Your upcoming stays"
        />

        <StatsCard
          title="Reviews"
          value={data?.reviewCount || 0}
          iconName="MessageSquareText"
          description="Total reviews given"
        />

        <StatsCard
          title="Total Spent"
          value={data?.totalSpent || 0}
          iconName="BadgeDollarSign"
          description="Total amount spent"
        />
      </div>

      <BookingStatusDistribution
        data={data?.bookingStatusDistribution || []}
      />

      <div className="rounded-2xl border p-5">
        <h2 className="mb-4 text-xl font-semibold">Recent Bookings</h2>

        <div className="space-y-4">
          {data?.recentBookings?.length ? (
            data.recentBookings.map((booking, index) => (
              <div
                key={booking.id}
                className="flex flex-col gap-4 rounded-xl border p-4 md:flex-row"
              >
                <div className="relative h-28 w-full overflow-hidden rounded-lg md:w-40">
                  <Image
                    src={booking.room.featuredImage}
                    alt={booking.room.roomTitle || "Room image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 160px"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-semibold">
                    {booking.room.roomTitle || "Untitled Room"}
                  </h3>
                  <p>Status: {booking.status}</p>
                  <p>Guests: {booking.guests}</p>
                  <p>
                    Check-in:{" "}
                    {new Date(booking.checkIn).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    Check-out:{" "}
                    {new Date(booking.checkOut).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p>Total Price: ${booking.totalPrice}</p>
                  <p>Rent per night: ${booking.room.rent}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No recent bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardContent;