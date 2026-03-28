import { useQuery } from "@tanstack/react-query";
import { IRoomFilters, IRoomsResponse } from "@/types/room.types";
import { getRooms } from "@/services/room.service";

export const roomKeys = {
  all: ["rooms"] as const,
  list: (queryString: string) => [...roomKeys.all, "list", queryString] as const,
};

export function buildRoomQueryString(filters: IRoomFilters): string {
  const params = new URLSearchParams();

  params.set("page", String(filters.page));
  params.set("limit", String(filters.limit));

  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);
  if (filters.searchTerm.trim()) params.set("searchTerm", filters.searchTerm.trim());

  if (filters.categoryId) params.set("categoryId", filters.categoryId);
  if (filters.bedTypeId) params.set("bedTypeId", filters.bedTypeId);
  if (filters.isEventSpace !== "") params.set("isEventSpace", filters.isEventSpace);
  if (filters.isFeatured !== "") params.set("isFeatured", filters.isFeatured);
  if (filters.isActive !== "") params.set("isActive", filters.isActive);
  if (filters.enableDynamicPricing !== "") params.set("enableDynamicPricing", filters.enableDynamicPricing);
  if (filters.minRent) params.set("minRent", filters.minRent);
  if (filters.maxRent) params.set("maxRent", filters.maxRent);
  if (filters.minRoomSize) params.set("minRoomSize", filters.minRoomSize);
  if (filters.maxRoomSize) params.set("maxRoomSize", filters.maxRoomSize);
  if (filters.numberOfBaths) params.set("numberOfBaths", filters.numberOfBaths);
  if (filters.minGuests) params.set("minGuests", filters.minGuests);
  if (filters.maxGuests) params.set("maxGuests", filters.maxGuests);
  if (filters.maxAdults) params.set("maxAdults", filters.maxAdults);
  if (filters.maxChildren) params.set("maxChildren", filters.maxChildren);
  if (filters.totalUnits) params.set("totalUnits", filters.totalUnits);

  return params.toString();
}

export function useRooms(filters: IRoomFilters) {
  const queryString = buildRoomQueryString(filters);

  return useQuery<IRoomsResponse>({
    queryKey: roomKeys.list(queryString),
    queryFn: () => getRooms(queryString),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 30,
  });
}