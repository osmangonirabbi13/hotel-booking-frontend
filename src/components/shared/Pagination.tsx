"use client";

import { useMemo, useState } from "react";

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
    return [1, "start-ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, "start-ellipsis", currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, "end-ellipsis", totalPages];
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalRows: number;
  pageSize: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalRows,
  pageSize,
  isLoading,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
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

  const onPageSizeSelect = (value: string) => {
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
    <div className="pagination">
      {/* Left: page buttons */}
      <div className="pg-left">
        <button
          className="pg-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isLoading}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Prev
        </button>

        {paginationItems.map((item) => {
          if (item === "start-ellipsis")
            return (
              <button
                key="start-ellipsis"
                className="pg-btn ghost"
                onClick={() => onPageChange(jumpBackwardTarget)}
                disabled={isLoading}
              >
                ...
              </button>
            );
          if (item === "end-ellipsis")
            return (
              <button
                key="end-ellipsis"
                className="pg-btn ghost"
                onClick={() => onPageChange(jumpForwardTarget)}
                disabled={isLoading}
              >
                ...
              </button>
            );
          return (
            <button
              key={item}
              className={`pg-btn ${item === currentPage ? "active" : ""}`}
              onClick={() => onPageChange(item)}
              disabled={isLoading}
            >
              {item}
            </button>
          );
        })}

        <button
          className="pg-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
        >
          Next
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Right: page size + total */}
      <div className="pg-right">
        <select
          className="pg-select"
          value={selectValue}
          onChange={(e) => onPageSizeSelect(e.target.value)}
          aria-label="Rows per page"
        >
          {DEFAULT_PAGE_SIZES.map((size) => (
            <option key={size} value={String(size)}>
              {size}
            </option>
          ))}
          <option value="custom">Custom</option>
        </select>
        <span>rows</span>

        {showCustomInput && (
          <div className="custom-size">
            <input
              type="number"
              min={1}
              value={customPageSize}
              onChange={(e) => setCustomPageSize(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyCustomPageSize();
                }
              }}
            />
            <button
              className="pg-btn"
              onClick={applyCustomPageSize}
              disabled={isLoading}
            >
              Apply
            </button>
          </div>
        )}

        <span className="total-label">
          Total {totalRows} items, {totalPages} pages
        </span>
      </div>
    </div>
  );
};

export default Pagination;