"use client";

import dynamic from "next/dynamic";
import OfflineIndicator from "@/components/OfflineIndicator";

const BudgetForm = dynamic(() => import('@/components/BudgetForm'), { ssr: false });
const Dashboard = dynamic(() => import('@/components/Dashboard'), { ssr: false });
const SyncButton = dynamic(() => import('@/components/SyncButton'), { ssr: false });

export default function Page() {

  

  const CategoryPie = dynamic(
    () => import('../components/CategoryPie'),
    { ssr: false }
  )
  return (
    <>
      <div className="flex items-center justify-between mb-4 px-10 ">
       <OfflineIndicator/>
        <SyncButton />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-card text-card-foreground border border-border px-5 py-10 w-fit mx-auto rounded-xl md:min-w-5xl">
        <BudgetForm />
        <Dashboard />

      </div>
      <div className="bg-card text-card-foreground border border-border px-5 py-10 max-w-5xl mx-auto rounded-xl md:min-w-5xl my-10">
        <CategoryPie />
      </div>
    </>
  );
}
