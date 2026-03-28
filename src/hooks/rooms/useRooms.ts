import { getRooms } from "@/services/room.service";
import { useQuery } from "@tanstack/react-query";



export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms(""),
  });
};