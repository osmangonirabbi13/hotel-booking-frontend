"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationToken = number | "start-ellipsis" | "end-ellipsis";

const DEFAULT_PAGE_SIZES = [2, 5, 10, 20, 50] as const;

const isDefaultPageSize = (value: number) =>
  DEFAULT_PAGE_SIZES.includes(value as (typeof DEFAULT_PAGE_SIZES)[number]);

const getPaginationItems = (
  currentPage: number,
  totalPages: number
): PaginationToken[] => {
  if (totalPages <= 0) return [];
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (currentPage <= 5) return [1, 2, 3, 4, 5, "end-ellipsis", totalPages];
  if (currentPage >= totalPages - 4)
    return [
      1,
      "start-ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  return [
    1,
    "start-ellipsis",
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    "end-ellipsis",
    totalPages,
  ];
};

interface RoomPaginationProps {
  currentPage: number;
  totalPages: number;
  totalRows: number;
  pageSize: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function RoomPagination({
  currentPage,
  totalPages,
  totalRows,
  pageSize,
  isLoading,
  onPageChange,
  onPageSizeChange,
}: RoomPaginationProps) {
  const [isCustomMode, setIsCustomMode] = useState(!isDefaultPageSize(pageSize));
  const [customPageSize, setCustomPageSize] = useState(String(pageSize));

  const isCurrentCustom = !isDefaultPageSize(pageSize);
  const showCustomInput = isCustomMode || isCurrentCustom;
  const selectValue = showCustomInput ? "custom" : String(pageSize);

  const paginationItems = useMemo(
    () => getPaginationItems(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const jumpBackwardTarget = Math.max(1, currentPage - 5);
  const jumpForwardTarget = Math.min(totalPages, currentPage + 5);

  const applyCustomPageSize = () => {
    const parsed = Number(customPageSize);
    if (!Number.isInteger(parsed) || parsed <= 0) return;
    setIsCustomMode(!isDefaultPageSize(parsed));
    onPageSizeChange(parsed);
  };

 const onPageSizeSelect = (value: string | null) => {
  if (!value) return;

  if (value === "custom") {
    setIsCustomMode(true);
    setCustomPageSize(String(pageSize));
    return;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return;

  setIsCustomMode(false);
  setCustomPageSize(String(parsed));
  onPageSizeChange(parsed);
};

  if (totalPages <= 0) return null;

  return (
    <div className="flex flex-col gap-3 border-t px-4 py-3 md:flex-row md:items-center md:justify-between bg-white rounded-xl border border-border/60">
      {/* Page buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>

        {paginationItems.map((item) => {
          if (item === "start-ellipsis")
            return (
              <Button
                key="start-ellipsis"
                variant="ghost"
                size="sm"
                className="min-w-9 px-2"
                onClick={() => onPageChange(jumpBackwardTarget)}
                disabled={isLoading}
              >
                ...
              </Button>
            );
          if (item === "end-ellipsis")
            return (
              <Button
                key="end-ellipsis"
                variant="ghost"
                size="sm"
                className="min-w-9 px-2"
                onClick={() => onPageChange(jumpForwardTarget)}
                disabled={isLoading}
              >
                ...
              </Button>
            );
          const isActive = item === currentPage;
          return (
            <Button
              key={item}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={cn(
                "min-w-9",
                isActive && "pointer-events-none bg-amber-600 hover:bg-amber-600 border-amber-600"
              )}
              onClick={() => onPageChange(item)}
              disabled={isLoading}
            >
              {item}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Page size + total */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Select value={selectValue} onValueChange={onPageSizeSelect}>
          <SelectTrigger className="w-24" aria-label="Rows per page">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent>
            {DEFAULT_PAGE_SIZES.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
        <span>rows</span>

        {showCustomInput && (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={1}
              className="h-9 w-20"
              value={customPageSize}
              onChange={(e) => setCustomPageSize(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyCustomPageSize();
                }
              }}
            />
            <Button
              size="sm"
              variant="outline"
              onClick={applyCustomPageSize}
              disabled={isLoading}
            >
              Apply
            </Button>
          </div>
        )}

        <span className="ml-1">
          Total {totalRows ?? 0} items, {totalPages} pages
        </span>
      </div>
    </div>
  );
}