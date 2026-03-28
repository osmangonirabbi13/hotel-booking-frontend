/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, AlertCircle, BedDouble, Filter } from "lucide-react";

import { IRoomFilters } from "@/types/room.types";
import { DEFAULT_ROOM_FILTERS } from "@/types/Roomfilters";

import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { RoomSidebar } from "./Sidebar";
import { RoomPagination } from "./Roompagination";
import { RoomCard } from "./RoomCard";
import { RoomGridSkeleton } from "@/components/module/rooms/Roomskeleton";
import { useRooms, buildRoomQueryString } from "@/hooks/rooms/useRooms";
import { useRoomCategories } from "@/hooks/roomCategory/useRoomCategories";
import { useBedTypes } from "@/hooks/BadType/useBedTypes";

export default function RoomsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  
const [filters, setFilters] = useState<IRoomFilters>(() => {
  const params = Object.fromEntries(searchParams.entries());
  return {
    ...DEFAULT_ROOM_FILTERS,
    sortBy: "roomTitle",
    sortOrder: "asc",
    ...params,
 
    page: Number(params.page ?? 1),
    limit: Number(params.limit ?? 6),
  };
});


  const [searchTerm, setSearchTerm] = useState(filters.searchTerm ?? "");

  const { data: categories } = useRoomCategories();
  const { data: bedTypes } = useBedTypes();

 
  const { data, isLoading, isError, error, isFetching } = useRooms(filters);


  const rooms = data?.data ?? [];
  const meta = data?.meta ?? { page: 1, limit: filters.limit ?? 6, total: 0, totalPages: 1 };

  const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const queryString = buildRoomQueryString(filters);
    router.push(`?${queryString}`, { scroll: false });
  }, [filters, router]);

  const updateFilters = useCallback((updates: Partial<IRoomFilters>) => {
    setFilters((prev) => ({ ...prev, ...updates, page: updates.page ?? 1 }));
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      updateFilters({ searchTerm: value, page: 1 });
    }, 500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 lg:flex-row">
      <aside className="hidden w-[280px] border-r bg-white lg:block lg:shrink-0">
        <div className="sticky top-0 p-4 lg:h-screen lg:overflow-y-auto">
          <RoomSidebar 
            filters={filters} 
            onChange={updateFilters} 
            categories={categories} 
            bedTypes={bedTypes} 
          />
        </div>
      </aside>

      <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger render={
                <Button variant="outline" size="icon" className="shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
              }/>
              <SheetContent side="left" className="w-[300px] p-0">
                <RoomSidebar 
                  filters={filters} 
                  onChange={updateFilters} 
                  categories={categories} 
                  bedTypes={bedTypes} 
                />
              </SheetContent>
            </Sheet>
          </div>

          <div className="relative w-full md:max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="h-11 pl-10 bg-white"
            />
          </div>
        </div>

        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error instanceof Error ? error.message : "Failed to load rooms."}</AlertDescription>
          </Alert>
        )}

        {/* Data Mapping - RoomCard render ekhane hochche */}
        {isLoading ? (
  <RoomGridSkeleton count={Number(filters.limit ?? 6)} />
) : rooms.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed">
    <BedDouble className="w-12 h-12 text-stone-300 mb-2" />
    <p className="text-stone-500 font-medium">No rooms found matching your criteria.</p>
  </div>
) : (
  <div className={`grid grid-cols-1 gap-6 transition-opacity duration-300 sm:grid-cols-2 xl:grid-cols-3 ${isFetching ? "opacity-60" : "opacity-100"}`}>
    {rooms.map((room: any) => (
      <RoomCard key={room.id} room={room} />
    ))}
  </div>
)}

{!isLoading && meta.totalPages > 1 && (
  <div className="mt-auto pt-6 border-t">
    <RoomPagination
      currentPage={Number(meta.page)}
      totalPages={meta.totalPages}
      totalRows={meta.total}
      pageSize={Number(filters.limit ?? 6)}
      isLoading={isFetching}
      onPageChange={(page) => updateFilters({ page })}
      onPageSizeChange={(limit) => updateFilters({ limit, page: 1 })}
    />
  </div>
)}
      </div>
    </div>
  );
}