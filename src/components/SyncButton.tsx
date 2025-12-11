'use client'
import React, { useEffect, useState } from 'react';
import { useBudgetStore } from '../../stores/useBudgetStore';


export default function SyncButton() {
    const budget = useBudgetStore(s => s.budget);
    const [status, setStatus] = useState<'local' | 'pending' | 'synced'>('local');
    const [online, setOnline] = useState<boolean>(true);


    const doSync = async () => {
        if (!budget) return;
        setStatus('pending');
        try {
            const res = await fetch('/api/budget/sync', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ monthYear: budget.monthYear, data: budget }) });
            if (res.ok) setStatus('synced'); else setStatus('local');
        } catch (e) { setStatus('local'); }
    }

    useEffect(() => {
            setOnline(navigator.onLine);
            const on = () => setOnline(true);
            const off = () => setOnline(false);
            window.addEventListener('online', on);
            window.addEventListener('offline', off);
            return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
        }, [])

    return (
        <div className="flex items-center gap-3">
            <button onClick={doSync} className={`px-3 py-1 rounded ${online? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Sync</button>
            <span className="text-sm">{status === 'local' ? 'Local Only' : status === 'pending' ? 'Sync Pending' : 'Synced'}</span>
        </div>
    )
}