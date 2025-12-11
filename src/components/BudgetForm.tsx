'use client'

import { useBudgetStore } from "../../stores/useBudgetStore";
import { Input } from "./ui/input";


export default function BudgetForm() {
    const budget = useBudgetStore(s => s.budget);
    const setBudget = useBudgetStore(s => s.setBudget);


    const onChange = (field: keyof NonNullable<typeof budget>, value: string) => {
        const num = Number(value || 0);
        setBudget({ [field]: num } as any);
    }


    return (
        <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-3">Monthly Budget</h2>
            <div className="grid grid-cols-1 gap-3">
                <label>Income
                    <Input className="w-full p-2 rounded mt-1" type="number" value={budget?.income ?? ''} onChange={(e) => onChange('income', e.target.value)} />
                </label>
                <label>Monthly Bills
                    <Input className="w-full p-2 rounded mt-1" type="number" value={budget?.bills ?? ''} onChange={(e) => onChange('bills', e.target.value)} />
                </label>
                <label>Food
                    <Input className="w-full p-2 rounded mt-1" type="number" value={budget?.food ?? ''} onChange={(e) => onChange('food', e.target.value)} />
                </label>
                <label>Transport
                    <Input className="w-full p-2 rounded mt-1" type="number" value={budget?.transport ?? ''} onChange={(e) => onChange('transport', e.target.value)} />
                </label>
                <label>Subscriptions
                    <Input className="w-full p-2 rounded mt-1" type="number" value={budget?.subscriptions ?? ''} onChange={(e) => onChange('subscriptions', e.target.value)} />
                </label>
                <label>Misc
                    <Input className="w-full p-2 rounded mt-1" type="number" value={budget?.misc ?? ''} onChange={(e) => onChange('misc', e.target.value)} />
                </label>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Auto-saved locally.</p>
        </div>
    )
}