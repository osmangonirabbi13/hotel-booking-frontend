import { ApiResponse } from "@/types/api.types";

export interface ICategory {
  id: string;
  name: string;
  isActive: boolean;
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

export interface IExtraService {
  id: string;
  serviceName: string;
  serviceAmount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IRoomAmenity {
  roomId: string;
  amenityId: string;
  amenity: IAmenity;
}

export interface IRoomExtraService {
  roomId: string;
  extraServiceId: string;
  extraService: IExtraService;
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


export type ICreateRoomPayload = {
  rent: number;
  totalUnits: number;
  roomSize?: number;
  numberOfBaths: number;
  maxGuests: number;
  maxAdults?: number;
  maxChildren?: number;

  categoryId: string;
  bedTypeId: string;

  isEventSpace?: boolean;
  isFeatured?: boolean;
  isActive?: boolean;
  enableDynamicPricing?: boolean;

  featuredImage?: string;
  sliderImages?: string[];

  roomTitle?: string;
  featuredTitle?: string;
  description?: string;

  seoTitle?: string;
  seoDescription?: string;

  adminId?: string;
  amenityIds?: string[];
  extraServiceIds?: string[];
};

export type IUpdateRoomPayload = {
  rent?: number;
  totalUnits?: number;
  roomSize?: number;
  numberOfBaths?: number;
  maxGuests?: number;
  maxAdults?: number;
  maxChildren?: number;

  categoryId?: string;
  bedTypeId?: string;

  isEventSpace?: boolean;
  isFeatured?: boolean;
  isActive?: boolean;
  enableDynamicPricing?: boolean;

  featuredImage?: string;
  sliderImages?: string[];

  roomTitle?: string;
  featuredTitle?: string;
  description?: string;

  seoTitle?: string;
  seoDescription?: string;

  adminId?: string;
  amenityIds?: string[];
  extraServiceIds?: string[];

  removeFeaturedImage?: boolean;
  deletedSliderImages?: string[];
};



export interface IRoomMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IRoomsResponse {
  success: boolean;
  message: string;
  data: IRoom[];
  meta: IRoomMeta;
}

export interface IRoomFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  searchTerm: string;

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

export interface ICategory {
  id: string;
  name: string;
}

export interface IBedType {
  id: string;
  name: string;
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

  category?: ICategory;
  bedType?: IBedType;
  amenities?: IRoomAmenity[];
extraServices?: IRoomExtraService[];
}