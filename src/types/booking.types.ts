"use server";   export interface ICreateBookingPayload {
  customerId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
}

    export interface IBookBookingPayload {
  roomId: string;
  checkIn: string | Date;
  checkOut: string | Date;
  guests: number;
  specialRequests?: string;
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

export interface IBooking {
  id: string;
  roomId: string;
  customerId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
  status:string;
  totalPrice: number
  createdAt: string;
  updatedAt: string;
}

export interface getAllBookingResponse { 
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
    }
}

export interface ICreateBookingPayload {
  customerId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
}

export interface IChangeBookingStatusPayload {
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
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
  paymentMethod?: string;
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

export interface IInitiateBookingPaymentPayload {
  paymentMethod: "Stripe" | "PayPal" | "Bank Transfer";
}