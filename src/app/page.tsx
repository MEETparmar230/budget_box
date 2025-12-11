"use client";

import dynamic from "next/dynamic";

const BudgetForm = dynamic(() => import('@/components/BudgetForm'), { ssr: false });
const Dashboard = dynamic(() => import('@/components/Dashboard'), { ssr: false });
const SyncButton = dynamic(() => import('@/components/SyncButton'), { ssr: false });

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-end mb-4 pe-10 ">
        
        <SyncButton />
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-card text-card-foreground border border-border px-5 py-10 w-fit mx-auto rounded-xl md:min-w-5xl">
        <BudgetForm />
        <Dashboard />
      </div>
    </>
  );
}
