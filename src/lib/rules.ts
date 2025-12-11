export function getAnalytics(budget: any) {
    const totalSpend = ['bills', 'food', 'transport', 'subscriptions', 'misc']
        .reduce((s, k) => s + (Number(budget?.[k]) || 0), 0);
    const income = Number(budget?.income || 0);
    const burnRate = income ? totalSpend / income : 0;
    const savings = income - totalSpend;
    const anomalies: string[] = [];
    if (income && (budget.food || 0) > 0.4 * income) anomalies.push('Food > 40% of income — consider reducing.');
    if (income && (budget.subscriptions || 0) > 0.3 * income) anomalies.push('Subscriptions > 30% of income — consider cancelling unused apps.');
    if (savings < 0) anomalies.push('Expenses exceed income.');
    return { totalSpend, burnRate, savings, anomalies };
}