import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings",
        },
      ],
    },
  ];
};


//  ADMIN NAV
export const adminNavItems: NavSection[] = [
  {
    title: "Admin Panel",
    items: [

        {
        title: "Amenity Create",
        href: "/admin/dashboard/amenities",
        icon: "BuildingStorefront",
        },
        {
        title: "Extra Service Create",
        href: "/admin/dashboard/extra-service",
        icon: "service",
        },
        {
        title: "Create Room",
        href: "/admin/dashboard/rooms",
        icon: "building",
        },
        {
        title: "Bed Type Management",
        href: "/admin/dashboard/bed-type",
        icon: "BedDouble",
        },
        {
        title: "Room Category Management",
        href: "/admin/dashboard/room-category",
        icon: "Calendar",
        },
      {
        title: "Manage Users",
        href: "/admin/dashboard/customer-management",
        icon: "Users",
      },
      {
        title: "Manage Bookings",
        href: "/admin/dashboard/book-management",
        icon: "Calendar",
      },
      
    ],
  },
];


export const customerNavItems: NavSection[] = [
  {
    title: "My Bookings",
    items: [
      {
        title: "My Bookings",
        href: "/dashboard/my-bookings",
        icon: "Calendar",
      },
      
    ],
  },
];



export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];

    case "CUSTOMER":
      return [...commonNavItems, ...customerNavItems];

    default:
      return commonNavItems;
  }
};