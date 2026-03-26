import { ApiResponse } from "@/types/api.types";

export interface ICategory {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBedType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAmenity {
  id: string;
  title: string;
  icon: string;
  serialNumber: number;
  createdAt: string;
  updatedAt: string;
}

export interface IRoomAmenity {
  roomId: string;
  amenityId: string;
  amenity: IAmenity;
}

export interface IExtraService {
  id: string;
  serviceName: string;
  serviceAmount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IRoomExtraService {
  roomId: string;
  extraServiceId: string;
  extraService: IExtraService;
}

export interface IRoom {
  id: string;
  rent: number;
  totalUnits: number;
  roomSize: number;
  numberOfBaths: number;
  maxGuests: number;
  maxAdults: number;
  maxChildren: number;
  categoryId: string;
  bedTypeId: string;
  isEventSpace: boolean;
  isFeatured: boolean;
  isActive: boolean;
  enableDynamicPricing: boolean;
  featuredImage: string | null;
  sliderImages: string[];
  roomTitle: string;
  featuredTitle: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
  adminId: string | null;
  category: ICategory;
  bedType: IBedType;
  admin: null;
  amenities: IRoomAmenity[];
  extraServices: IRoomExtraService[];
}

export interface IRoomMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IRoomsResponse extends ApiResponse<IRoom[]> {
  meta: IRoomMeta;
}

export interface IRoomFilters {
  // Pagination
  page: number;
  limit: number;
  // Search
  searchTerm: string;
  // Sort
  sortBy: string;
  sortOrder: "asc" | "desc";
  // Filterable fields
  categoryId: string;
  bedTypeId: string;
  isEventSpace: string;
  isFeatured: string;
  isActive: string;
  enableDynamicPricing: string;
  minRent: string;
  maxRent: string;
  minRoomSize: string;
  maxRoomSize: string;
  numberOfBaths: string;
  minGuests: string;
  maxGuests: string;
  maxAdults: string;
  maxChildren: string;
  totalUnits: string;
}
