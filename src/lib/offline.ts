export function isOnline() {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
}


export function onOnline(cb: () => void) {
    if (typeof window === 'undefined') return () => { };
    window.addEventListener('online', cb);
    return () => window.removeEventListener('online', cb);
}


export function onOffline(cb: () => void) {
    if (typeof window === 'undefined') return () => { };
    window.addEventListener('offline', cb);
    return () => window.removeEventListener('offline', cb);
}