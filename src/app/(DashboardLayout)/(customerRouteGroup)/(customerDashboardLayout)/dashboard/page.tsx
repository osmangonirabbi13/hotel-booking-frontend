import CustomerDashboardContent from "@/components/module/Dashboord/CustomerDashboardContent";
import { getDashboardData } from "@/services/dashboard.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const CustomerDashboardPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["customer-dashboard-data"],
    queryFn: getDashboardData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomerDashboardContent />
    </HydrationBoundary>
  );
};

export default CustomerDashboardPage;