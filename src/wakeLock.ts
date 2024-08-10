export async function requestWakeLock() {
    try {
        // @ts-ignore
        const wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake lock is active');

        wakeLock.addEventListener('release', () => {
            console.log('Wake lock was released');
        });

        return wakeLock;
    } catch (err: any) {
        console.error(`${err.name}, ${err.message}`);
    }
}
