import { IRoomFilters } from "./room.types";

export const DEFAULT_ROOM_FILTERS: IRoomFilters = {
  page: 1,
  limit: 6,
  sortBy: "roomTitle",
  sortOrder: "asc",
  searchTerm: "",

  categoryId: "",
  bedTypeId: "",
  isEventSpace: "",
  isFeatured: "",
  isActive: "",
  enableDynamicPricing: "",

  minRent: "",
  maxRent: "",
  minRoomSize: "",
  maxRoomSize: "",
  numberOfBaths: "",
  minGuests: "",
  maxGuests: "",
  maxAdults: "",
  maxChildren: "",
  totalUnits: "",
};