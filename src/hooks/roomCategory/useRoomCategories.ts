import { useQuery } from "@tanstack/react-query";
import { getAllRoomCategories } from "@/services/roomCategory.service";

export const useRoomCategories = () => {
  return useQuery({
    queryKey: ["room-categories"],
    queryFn: getAllRoomCategories,
  });
};