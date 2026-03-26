"use client";

import React from "react";

export interface IDataTableColumn<T> {
  key: string;
  title: string;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
}

interface IDataTableProps<T> {
  columns: IDataTableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  rowKey: (row: T, index: number) => string;
}

export default function DataTable<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data found",
  rowKey,
}: IDataTableProps<T>) {
   if (isLoading) {
    return (
       <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-white dark:bg-slate-900">
      {/* Outer Spinning Ring */}
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Loading...
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Please wait a moment.
        </p>
      </div>
    </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`border-b px-4 py-3 text-left text-sm font-semibold text-gray-700 ${column.className || ""}`}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={rowKey(row, index)} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`border-b px-4 py-3 text-sm text-gray-700 ${column.className || ""}`}
                  >
                    {column.render ? column.render(row, index) : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}