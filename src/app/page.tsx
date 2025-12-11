"use client";

import dynamic from "next/dynamic";

const BudgetForm = dynamic(() => import('@/components/BudgetForm'), { ssr: false });
const Dashboard = dynamic(() => import('@/components/Dashboard'), { ssr: false });
const OfflineIndicator = dynamic(() => import('@/components/OfflineIndicator'), { ssr: false });
const SyncButton = dynamic(() => import('@/components/SyncButton'), { ssr: false });

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <OfflineIndicator />
        <SyncButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BudgetForm />
        <Dashboard />
      </div>
    </>
  );
}
