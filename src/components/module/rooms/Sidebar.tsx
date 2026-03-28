/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IRoomFilters } from "@/types/room.types";
import { DEFAULT_ROOM_FILTERS } from "@/types/Roomfilters";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Props interface update kora hoyeche dynamic data accept korar jonno
interface SidebarProps {
  filters: IRoomFilters;
  onChange: (updates: Partial<IRoomFilters>) => void;
  categories?: any[]; // Dynamic categories string/object array
  bedTypes?: any[];    // Dynamic bed types array
}

function countActiveFilters(filters: IRoomFilters): number {
  const skip: (keyof IRoomFilters)[] = [
    "page",
    "limit",
    "sortBy",
    "sortOrder",
    "searchTerm",
  ];

  return Object.entries(filters).filter(
    ([key, val]) =>
      !skip.includes(key as keyof IRoomFilters) &&
      val !== "" &&
      val !== (DEFAULT_ROOM_FILTERS as any)[key]
  ).length;
}

const normalizeSelectValue = (
  value: string | null,
  emptyOption: string
): string => {
  if (!value || value === emptyOption) return "";
  return value;
};

export function RoomSidebar({ filters, onChange, categories, bedTypes }: SidebarProps) {
  const activeCount = countActiveFilters(filters);

  const resetFilters = () => {
    onChange({
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
      page: 1,
    });
  };

  return (
    <aside className="w-full lg:w-[270px] bg-white lg:border-r border-border/60 overflow-y-auto h-full">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-foreground">Filters</h2>
          {activeCount > 0 && (
            <Badge
              variant="secondary"
              className="bg-amber-100 px-1.5 py-0 text-[10px] text-amber-800"
            >
              {activeCount}
            </Badge>
          )}
        </div>

        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={resetFilters}
          >
            <X className="mr-1 h-3 w-3" />
            Reset
          </Button>
        )}
      </div>

      <div className="px-3 py-2">
        <Accordion 
  {...({ 
    type: "multiple", 
    defaultValue: ["category", "price"], 
    className: "w-full space-y-0" 
  } as any)}
>
          
        
          <AccordionItem value="category" className="border-b border-border/40">
            <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
              Category
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <Select
                value={filters.categoryId || "_all"}
                onValueChange={(value) =>
                  onChange({
                    categoryId: normalizeSelectValue(value, "_all"),
                    page: 1,
                  })
                }
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_all">All categories</SelectItem>
                  {categories?.map((c: any) => (
                    <SelectItem key={c.id || c._id} value={c.id || c._id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>

          {/* Dynamic Bed Types */}
          <AccordionItem value="bedtype" className="border-b border-border/40">
            <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
              Bed Type
            </AccordionTrigger>
            <AccordionContent className="space-y-1.5 pb-3">
              {bedTypes?.map((bed: any) => {
                const bedId = bed.id || bed._id;
                const isSelected = filters.bedTypeId === bedId;
                return (
                  <div
                    key={bedId}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                      isSelected
                        ? "bg-amber-50 font-medium text-amber-900"
                        : "text-muted-foreground hover:bg-muted/50"
                    }`}
                    onClick={() =>
                      onChange({
                        bedTypeId: isSelected ? "" : bedId,
                        page: 1,
                      })
                    }
                  >
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full border ${
                        isSelected
                          ? "border-amber-600 bg-amber-600"
                          : "border-muted-foreground/40"
                      }`}
                    />
                    {bed.name}
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>

          {/* Rent Range */}
          <AccordionItem value="price" className="border-b border-border/40">
            <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
              Rent Range ($)
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="mb-1 block text-xs text-muted-foreground">Min</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.minRent || ""}
                    onChange={(e) => onChange({ minRent: e.target.value, page: 1 })}
                    className="h-9 text-sm"
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-xs text-muted-foreground">Max</Label>
                  <Input
                    type="number"
                    placeholder="Any"
                    value={filters.maxRent || ""}
                    onChange={(e) => onChange({ maxRent: e.target.value, page: 1 })}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Guest Capacity */}
          <AccordionItem value="capacity" className="border-b border-border/40">
            <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
              Guest Capacity
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pb-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="mb-1 block text-xs text-muted-foreground">Min Guests</Label>
                  <Input
                    type="number"
                    placeholder="1"
                    value={filters.minGuests || ""}
                    onChange={(e) => onChange({ minGuests: e.target.value, page: 1 })}
                    className="h-9 text-sm"
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-xs text-muted-foreground">Max Guests</Label>
                  <Input
                    type="number"
                    placeholder="Any"
                    value={filters.maxGuests || ""}
                    onChange={(e) => onChange({ maxGuests: e.target.value, page: 1 })}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Status & Features */}
          <AccordionItem value="status" className="border-none">
            <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
              Status & Features
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pb-3">
              {[
                { label: "Featured Only", key: "isFeatured" },
                { label: "Event Space", key: "isEventSpace" },
                { label: "Active Only", key: "isActive" },
                { label: "Dynamic Pricing", key: "enableDynamicPricing" },
              ].map((item) => (
                <div key={item.key}>
                  <div className="flex items-center justify-between">
                    <Label className="cursor-pointer text-sm text-muted-foreground">{item.label}</Label>
                    <Switch
                      checked={(filters as any)[item.key] === "true"}
                      onCheckedChange={(checked) =>
                        onChange({ [item.key]: checked ? "true" : "", page: 1 })
                      }
                    />
                  </div>
                  {item.key !== "enableDynamicPricing" && <Separator className="my-2" />}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </aside>
  );
}