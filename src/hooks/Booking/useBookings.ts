/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllBookings, deleteBooking, changeBookingStatus } from "@/services/booking.service";
import { toast } from "sonner"; 
import Swal from 'sweetalert2';
export const useGetBookings = () => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });
};

export const useBookingActions = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBooking(id),
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Booking has been deleted successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: any }) => 
      changeBookingStatus(id, { status }),
    onSuccess: () => {
      toast.success("Status updated!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  return { deleteMutation, updateStatusMutation };
};