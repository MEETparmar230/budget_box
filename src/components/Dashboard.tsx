'use client'
import { getAnalytics, monthEndPrediction } from '@/lib/rules';
import { useBudgetStore } from '../../stores/useBudgetStore';


export default function Dashboard() {



    const budget = useBudgetStore(s => s.budget);
    if (!budget) return <div className="card">No budget saved yet.</div>
    const a = getAnalytics(budget);
    return (
        <div className="card space-y-3">
            <h3 className="text-2xl font-semibold">Summary</h3>
            <div>Burn Rate: {(a.burnRate * 100).toFixed(1)}%</div>
            <div>Savings: ₹{a.savings}</div>
            <div>Total Spend: ₹{a.totalSpend}</div>
            {a.anomalies.length > 0 && (
                <div className="mt-2">
                    <h4 className="font-semibold">Anomalies</h4>
                    <ul className="list-disc pl-5">
                        {a.anomalies.map((x, i) => (<li key={i}>{x}</li>))}
                    </ul>
                </div>
            )}
            {budget && <div className='font-bold'>Projected Month Spend: ₹{monthEndPrediction(budget)}</div>}
        </div>
    )
}