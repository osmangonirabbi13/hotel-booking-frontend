import BookingTable from '@/components/module/Booking/BookingTable';
import React from 'react';
export const dynamic = "force-dynamic";

const BookManagementPage = () => {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Booking Management</h1>
                <p className="text-sm text-gray-500">Manage all your customer bookings and payments here.</p>
            </div>
            
            <div className="bg-white rounded-lg border shadow-sm">
                <BookingTable />
            </div>
        </div>
    );
};

export default BookManagementPage;