'use client'

import { useBudgetStore } from "../../stores/useBudgetStore";
import { Input } from "./ui/input";

type Budget = {
    income: number;
    bills: number;
    food: number;
    transport: number;
    subscriptions: number;
    miscellaneous: number;
    updatedAt: string;
    monthYear: string;
};

export default function BudgetForm() {
    const budget = useBudgetStore(s => s.budget);
    const setBudget = useBudgetStore(s => s.setBudget);


    const onChange = (field: keyof NonNullable<typeof budget>, value: string) => {
        const num = Number(value || 0);
        setBudget({ [field]: num } as Partial<Budget>);
    }

    const onLatest = async () => {
        try {
            const res = await fetch("/api/budget/latest", {
                cache: "no-store",
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error(`HTTP error while fetching latest, status: ${res.status}`);
            }

            const data = await res.json();

            if (data?.budget) {
                useBudgetStore.getState().replaceBudget({
                    ...data.budget,
                    updatedAt: data.updatedAt,
                    monthYear: data.monthYear,
                });

            }
        } catch (err) {
            console.error("Fetch latest failed", err);
        }
    };



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
                <label>Miscellaneous
                    <Input className="w-full p-2 rounded mt-1" type="number" value={budget?.miscellaneous ?? ''} onChange={(e) => onChange('miscellaneous', e.target.value)} />
                </label>
            </div>

            <span className="text-sm text-muted-foreground mt-3">Auto-saved locally.</span><span><button className="text-foreground text-sm mx-2 px-2 rounded-sm cursor-pointer border border-border mt-3" onClick={onLatest}>fetch Latest</button></span>
        </div>
    )
}