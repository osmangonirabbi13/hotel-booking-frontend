"use client";

import { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type SelectorFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function SelectorField({ label, value, options, onChange }: SelectorFieldProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-[54px] w-full rounded-md border border-white/40 bg-transparent px-4 py-6 text-white transition hover:border-white focus:ring-0 focus:ring-offset-0 outline-none">
        <span className="flex items-center gap-2">
          <span className="text-[14px] font-medium text-white/90">{label} :</span>
          <SelectValue>
            <span className="text-[14px] font-semibold">{value}</span>
          </SelectValue>
        </span>
      </SelectTrigger>
      <SelectContent className="z-[200] rounded-md border border-[#AA8453]/20 bg-white p-1 shadow-xl">
        {options.map((opt) => (
          <SelectItem
            key={opt}
            value={opt}
            className="cursor-pointer rounded-md px-3 py-2 text-sm text-[#1B1B1B] transition focus:bg-[#AA8453] focus:text-white"
          >
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function BookingBar() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [rooms, setRooms] = useState("01");
  const [adults, setAdults] = useState("01");
  const [children, setChildren] = useState("00");

  useEffect(() => {
    setDateRange({ from: new Date(), to: addDays(new Date(), 1) });
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="mx-auto w-full max-w-340 px-4">
      <div className="rounded-md bg-[#B88D53] p-3 shadow-xl sm:p-4 lg:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[1.2fr_1.2fr_.8fr_.8fr_.8fr_1fr] xl:items-center">

          {/* Check In */}
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger
              type="button"
              className="flex h-[54px] w-full cursor-pointer items-center justify-between rounded-md border border-white/40 px-4 text-white transition hover:border-white outline-none focus:ring-0"
            >
              <span className="flex items-center gap-2">
                <span className="text-[14px] font-medium text-white/90">Check in :</span>
                <span className="text-[14px] font-semibold">
                  {dateRange?.from ? format(dateRange.from, "dd/MM/yyyy") : "--/--/----"}
                </span>
              </span>
              <ChevronDown className="h-4 w-4 text-white/75" />
            </PopoverTrigger>

            <PopoverContent
              align="start"
              sideOffset={12}
              className="z-[200] w-auto overflow-hidden rounded-md border border-gray-100 bg-white p-0 shadow-2xl"
            >
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={isMobile ? 1 : 2}
                className="p-4"
              />
              <div className="flex justify-end border-t border-gray-100 bg-gray-50 p-4">
                <button
                  type="button"
                  onClick={() => setCalendarOpen(false)}
                  className="rounded bg-[#151515] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-black"
                >
                  Apply Dates
                </button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Check Out */}
          <button
            type="button"
            onClick={() => setCalendarOpen(true)}
            className="flex h-[54px] w-full items-center justify-between rounded-md border border-white/40 px-4 text-left text-white transition hover:border-white"
          >
            <span className="flex items-center gap-2">
              <span className="text-[14px] font-medium text-white/90">Check out :</span>
              <span className="text-[14px] font-semibold">
                {dateRange?.to ? format(dateRange.to, "dd/MM/yyyy") : "--/--/----"}
              </span>
            </span>
            <CalendarIcon className="h-4 w-4 text-white/75" />
          </button>

          <SelectorField
            label="Rooms"
            value={rooms}
            options={["01", "02", "03"]}
            onChange={setRooms}
          />
          <SelectorField
            label="Adults"
            value={adults}
            options={["01", "02", "03", "04"]}
            onChange={setAdults}
          />
          <SelectorField
            label="Children"
            value={children}
            options={["00", "01", "02"]}
            onChange={setChildren}
          />

          <button
            type="button"
            className="h-[54px] w-full rounded-md bg-[#151515] px-6 text-[14px] font-bold uppercase tracking-wider text-white transition hover:bg-black"
          >
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
}