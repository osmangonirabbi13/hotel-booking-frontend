// src/app/(DashboardLayout)/admin/dashboard/rooms/page.tsx
"use client"; // <--- Add this at the top

import { useRooms } from "@/hooks/rooms/useRooms";

export default function RoomsPage() {
  const { data, isLoading } = useRooms();
  
  if (isLoading) return <div>Loading...</div>;
//   console.log(data)
  return (
    <div>
      {/* Render your rooms here */}
    </div>
  );
}