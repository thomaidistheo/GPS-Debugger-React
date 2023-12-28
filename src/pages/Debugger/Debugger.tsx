import React, { useState, useEffect } from 'react'
import styles from './Debugger.module.scss'

import DeviceDetails from "../../components/DeviceDetails/DeviceDetails"
import SearchBar from "../../components/SearchBar/SearchBar"

import fetchDeviceData from '../../components/fetchers/DeviceDataFetcher'
import loadingGif from '../../assets/loading-ripple.gif'
import { GpsData } from '../../types'
import OpenStreetMap from '../../components/OpenStreetMap/OpenStreetMap'

function Debugger() {
    const [gpsData, setGpsData] = useState<GpsData | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [imei, setImei] = useState<string>('') // To store the current IMEI

    const updateInterval = 5000 // 30 seconds

    const fetchDeviceDataWithInterval = () => {
        // setIsLoading(true)

        fetchDeviceData(imei, (data, error) => {
            setIsLoading(false)
            error ? console.log(error) : setGpsData(data)
            console.log('Data fetched')
        })
    }

    useEffect(() => {
        if (imei) {
            // Fetch immediately for the first time
            fetchDeviceDataWithInterval()
            setIsLoading(true)

            // Set up the interval for subsequent fetches
            const intervalId = setInterval(fetchDeviceDataWithInterval, updateInterval)

            // Clear the interval when the component unmounts
            return () => clearInterval(intervalId)
        }
    }, [imei])

    const handleFetchData = (newImei: string) => {
        setImei(newImei)
    }

    return (
        <>
            {isLoading ? (
                <div className={styles.loadingScreen}>
                    <div className={styles.imgCont}>
                        <img src={loadingGif} alt="Loading..." />
                    </div>
                </div>
            ) : (
                <>
                    <SearchBar onSearch={handleFetchData} />
                    {gpsData ? (
                        <div className={styles.deviceDetailsSection}>
                            <OpenStreetMap gpsData={gpsData} />
                            <DeviceDetails gpsData={gpsData} />
                        </div>
                    ) : (
                        console.log('No device data yet')
                    )}
                </>
            )}
        </>
    )
}

export default Debugger