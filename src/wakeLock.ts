export async function requestWakeLock() {
    try {
        // @ts-ignore
        return await navigator.wakeLock.request('screen');
    } catch (err: any) {
        console.error(`${err.name}, ${err.message}`);
    }
}
