'use client'
import React, { useEffect, useState } from 'react';


export default function OfflineIndicator() {
    const [online, setOnline] = useState(true);
    useEffect(() => {
        setOnline(navigator.onLine);
        const on = () => setOnline(true);
        const off = () => setOnline(false);
        window.addEventListener('online', on);
        window.addEventListener('offline', off);
        return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
    }, [])
    return <div className={`text-sm ${online ? 'text-green-400' : 'text-red-400'}`}>{online ? 'Online' : 'Offline'}</div>
}