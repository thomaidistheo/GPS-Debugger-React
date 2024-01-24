const fetchDeviceData = async (imei: string, onFetchComplete: (data: any, error: string | null) => void) => {
    const serverIP = import.meta.env.VITE_SERVER_IP;
    // console.log('Server IP:', import.meta.env.VITE_SERVER_IP);

    try {
        const response = await fetch(`${serverIP}/${imei}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
        })

        if (response.ok && response.headers.get('Content-Type')?.includes('application/json')) {
            const gpsData = await response.json()

            if (gpsData.Imei === undefined || gpsData.Imei === null) {
                onFetchComplete(null, 'IMEI not found.')
            } else {
                onFetchComplete(gpsData, null)
            }
        } else {
            onFetchComplete(null, 'Something went wrong - 304')
        }
    } catch (error) {
        onFetchComplete(null, 'Something went wrong. - 1001')
    }
}

export default fetchDeviceData