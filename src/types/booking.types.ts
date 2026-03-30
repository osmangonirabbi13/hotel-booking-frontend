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

export interface IPayment {
  id: string;
  amount: number;
  transactionId: string;
  stripeEventId?: string | null;
  status?: string;
  invoiceUrl?: string | null;
  paymentGatewayData?: unknown;
  createdAt: string;
  updatedAt: string;
  bookingId: string;
}

export interface IBookingRoom {
  id: string;
  rent?: number;
  totalUnits?: number;
  roomSize?: number;
  numberOfBaths?: number;
  maxGuests?: number;
  maxAdults?: number | null;
  maxChildren?: number | null;
  categoryId?: string;
  bedTypeId?: string;
  isEventSpace?: boolean;
  isFeatured?: boolean;
  isActive?: boolean;
  enableDynamicPricing?: boolean;
  featuredImage?: string | null;
  sliderImages?: string[];
  roomTitle?: string | null;
  featuredTitle?: string | null;
  description?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  createdAt?: string;
  updatedAt?: string;
  adminId?: string | null;
}

export interface IBooking {
  id: string;
  roomId: string;
  customerId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  adults?: number;
  children?: number;
  specialRequests?: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  bookingId?: string;

  customer?: {
    id: string;
    name?: string;
    email?: string;
  };

  room?: IBookingRoom;
  payment?: IPayment;
}

export interface IBookingResponse {
  booking: IBooking;
  payment: IPayment;
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

export interface IBookingListData {
  data: IBooking[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}