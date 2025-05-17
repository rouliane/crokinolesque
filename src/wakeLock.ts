export async function requestWakeLock() {
    try {
        // @ts-ignore
        return await navigator.wakeLock.request('screen');
    } catch (err: any) {
    }
}
