export interface NavItem {
  title: string;
  href: string;
  icon: string;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface PieChartData {
  status: string;
  count: number;
}

export interface BarChartData {
  month: string | Date;
  bookingCount: number;
  revenue: number;
}

export interface IAdminDashboardData {
  totalBookings: number;
  pendingBookings: number;
  totalRooms: number;
  activeRooms: number;
  featuredRooms: number;
  totalCustomers: number;
  totalRevenue: number;
  bookingStatusDistribution: PieChartData[];
  monthlyChart: BarChartData[];
  roomCategoryBreakdown: { category: string; count: number }[];
  topBookedRooms: {
    id: string;
    roomTitle: string | null;
    featuredImage: string;
    rent: number;
    bookingCount: number;
  }[];
}
