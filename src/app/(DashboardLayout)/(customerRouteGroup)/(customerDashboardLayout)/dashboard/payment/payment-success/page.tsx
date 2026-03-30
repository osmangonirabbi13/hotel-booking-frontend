

import { Suspense } from "react";
import PaymentSuccessContent from "@/components/module/Dashboord/PaymentSuccessContent";

export const dynamic = "force-dynamic";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<PaymentSuccessSkeleton />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessSkeleton() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-green-50 to-white px-4 py-10">
      <div className="mx-auto max-w-3xl animate-pulse rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-10">
        <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-stone-200" />
        <div className="mx-auto mb-3 h-8 w-64 rounded bg-stone-200" />
        <div className="mx-auto mb-8 h-4 w-96 rounded bg-stone-200" />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-24 rounded-2xl bg-stone-100" />
          <div className="h-24 rounded-2xl bg-stone-100" />
        </div>

        <div className="mt-6 h-32 rounded-2xl bg-stone-100" />

        <div className="mt-8 flex justify-center gap-3">
          <div className="h-11 w-40 rounded-xl bg-stone-200" />
          <div className="h-11 w-40 rounded-xl bg-stone-200" />
        </div>
      </div>
    </div>
  );
}