'use client'
import { useEffect, useState } from 'react';
import { useBudgetStore } from '../../stores/useBudgetStore';
import { Button } from './ui/button';
import { isOnline, onOffline, onOnline } from '@/lib/offline';


export default function SyncButton() {

    const [online, setOnline] = useState<boolean>(true);
    const syncStatus = useBudgetStore(s => s.syncStatus);
    const tryAutoSync = useBudgetStore(s => s.tryAutoSync);


 useEffect(() => {
   
    if (isOnline()) {
      tryAutoSync()
    }

    const unsubOnline = onOnline(() => {
      setOnline(true)
      tryAutoSync()
    })

    const unsubOffline = onOffline(() => {
      setOnline(false)
    })

    return () => {
      unsubOnline()
      unsubOffline()
    }
  }, [tryAutoSync])

    return (
        <div className="flex items-center gap-3 flex flex-col">

            <Button disabled={!online || syncStatus === 'pending'} onClick={tryAutoSync} className={`px-3 py-1 rounded ${online ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Sync</Button>
            <span className="text-sm">{syncStatus === 'local' ? 'Local Only' : syncStatus === 'pending' ? 'Sync Pending' : 'Synced'}</span>
        </div>
    )
}