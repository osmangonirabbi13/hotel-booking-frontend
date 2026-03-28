/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { IRoomFilters, IRoomsResponse } from "@/types/room.types";
import { getRooms } from "@/services/room.service";

export const roomKeys = {
  all: ["rooms"] as const,
  list: (queryString: string) => [...roomKeys.all, "list", queryString] as const,
};

export const buildRoomQueryString = (filters: any) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "_all" && value !== "_any") {
      params.append(key, value.toString());
    }
  });
  return params.toString();
};

export function useRooms(filters: IRoomFilters) {
  const queryString = buildRoomQueryString(filters);

  return useQuery<IRoomsResponse>({
    queryKey: roomKeys.list(queryString),
    queryFn: () => getRooms(queryString),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 30,
  });
}