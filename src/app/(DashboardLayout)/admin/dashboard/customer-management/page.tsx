import CustomerTable from "@/components/module/Customer/CustomerTable";

const CustomerManagementPage = () => {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Customer Management</h1>
                    <p className="text-sm text-gray-500">Manage all your registered customers and their roles here.</p>
                </div>
            </div>
            
            <div className="bg-white rounded-lg border shadow-sm">
                <CustomerTable />
            </div>
        </div>
    );
};

export default CustomerManagementPage;