export interface IApiResponse<TData = unknown> {
  success: boolean;
  message: string;
  data: TData;
}

export interface IBookBookingPayload {
  roomId: string;
  checkIn: string | Date;
  checkOut: string | Date;
  guests: number;
  adults: number;
  children: number;
  extraServiceIds?: string[];
}

export interface IBooking {
  id: string;
  roomId: string;
  customerId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
  status: string;
  totalPrice: number;
  paymentStatus?: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
  bookingId?: string;

  customer?: {
    id: string;
    name?: string;
    email?: string;
  };

  room?: {
    id: string;
    roomTitle?: string;
    name?: string;
  };
}

export interface IBookingResponse {
  booking: IBooking;
  payment: {
    id: string;
    amount: number;
    transactionId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    bookingId: string;
  };
  paymentUrl: string;
}

export interface IUpdateBookingPayload {
  id: string;
  roomId: string;
  customerId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
}

export interface IChangeBookingStatusPayload {
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
}

export interface GetAllBookingResponse {
  data: {
    id: string;
    hotelId: string;
    roomId: string;
    userId: string;
    checkInDate: string;
    checkOutDate: string;
    totalAmount: number;
    status: string;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
    bookingId: string;
  }[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}