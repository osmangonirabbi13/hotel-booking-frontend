"use client"

import BookingStatusDistribution from "@/components/shared/bookingStatusDistribution"
import MonthlyChart from "@/components/shared/monthlyChart"
import StatsCard from "@/components/shared/StatsCard"
// import AppointmentBarChart from "@/components/shared/AppointmentBarChart"
// import AppointmentPieChart from "@/components/shared/AppointmentPieChart

import { httpClientBrowser } from "@/lib/axios/httpClientBrowser"

import { ApiResponse } from "@/types/api.types"
import { IAdminDashboardData } from "@/types/dashboard.types"
import { useQuery } from "@tanstack/react-query"

const AdminDashboardContent = () => {
    const {data : adminDashboardData} = useQuery({
        queryKey: ["admin-dashboard-data"],
        queryFn: () => httpClientBrowser.get<IAdminDashboardData>("/stats"),
        refetchOnWindowFocus: "always",
        staleTime: 1000 * 60 * 1,
        gcTime: 1000 * 60 * 2,
    })

    const {data} = adminDashboardData as ApiResponse<IAdminDashboardData>;

    
  return (
    <div>
         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Bookings"
          value={data?.totalBookings || 0}
          iconName="CalendarDays"
          description="Number of bookings"
        />

        <StatsCard
          title="Total Users"
          value={data?.totalCustomers || 0}
          iconName="Users"
          description="Number of customers registered"
        />

        <StatsCard
          title="Total Revenue"
          value={data?.totalRevenue || 0}
          iconName="BadgeDollarSign"
          description="Total booking revenue"
        />

        <StatsCard
          title="Total Rooms"
          value={data?.totalRooms || 0}
          iconName="BedDouble"
          description="Total available rooms"
        />
        <StatsCard
          title="Active Rooms"
          value={data?.activeRooms || 0}
          iconName="BedDouble"
          description="Total available rooms"
        />
        <StatsCard
          title="Featured Rooms"
          value={data?.featuredRooms || 0}
          iconName="BedDouble"
          description="Total available rooms"
        />
        <StatsCard
          title="Pending Bookings"
          value={data?.pendingBookings || 0}
          iconName="BedDouble"
          description="Total available rooms"
        />
      </div>


        <MonthlyChart
        data={data?.monthlyChart || []}
        />

        <BookingStatusDistribution
        data={data?.bookingStatusDistribution || []}
        />
    </div>
  )
}

export default AdminDashboardContent