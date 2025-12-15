'use client'

import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useBudgetStore } from '../../stores/useBudgetStore'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function CategoryPie() {
  const budget = useBudgetStore(s => s.budget)
  if (!budget) return null

  console.log(budget)

  const data = {
  labels: ['Bills', 'Food', 'Transport', 'Subscriptions', 'Miscellaneous'],
  datasets: [
    {
      data: [
        budget.bills,
        budget.food,
        budget.transport,
        budget.subscriptions,
        budget.miscellaneous,
      ],
      backgroundColor: [
        '#3b82f6', 
        '#22c55e', 
        '#f97316', 
        '#a855f7',
        '#ef4444', 
      ],
      borderColor: '#ffffff',
      borderWidth: 2,
    },
  ],
}

  return (
    <div className="card">
      <h3 className="text-2xl font-semibold mb-2 ">
        Spending Breakdown
      </h3>
<div className="flex justify-center mt-10">
  <div className="w-[400px] h-[400px]">
    <Pie data={data} />
  </div>
</div>

    </div>
  )
}
