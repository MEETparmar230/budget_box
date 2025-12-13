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

  const data = {
    labels: [
      'Bills',
      'Food',
      'Transport',
      'Subscriptions',
      'Miscellaneous',
    ],
    datasets: [
      {
        data: [
          budget.bills,
          budget.food,
          budget.transport,
          budget.subscriptions,
          budget.miscellaneous,
        ],
      },
    ],
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-2">
        Spending Breakdown
      </h3>
      <Pie data={data} />
    </div>
  )
}
