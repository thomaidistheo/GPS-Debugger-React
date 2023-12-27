import React, { useState } from 'react'
import styles from './Debugger.module.scss'

import DeviceDetails from "../../components/DeviceDetails/DeviceDetails"
import SearchBar from "../../components/SearchBar/SearchBar"

import fetchDeviceData from '../../components/fetchers/DeviceDataFetcher'
import loadingGif from '../../assets/loading-ripple.gif'
import { GpsData } from '../../types'

function Debugger() {
    const [gpsData, setGpsData] = useState<GpsData | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleFetchData = (imei: string) => {
        setIsLoading(true)
        
        setTimeout(() => {
            fetchDeviceData(imei, (data, error) => {
                setIsLoading(false)
                error ? console.log(error) : setGpsData(data)
            })
        }, 2000)
        
    }
    return (
        <>

            <SearchBar onSearch={handleFetchData} />
            {isLoading
                ? <div className={styles.loadingScreen}>
                    <div className={styles.imgCont}>
                        <img src={loadingGif} alt="Loading..." />
                    </div>
                </div>
                :
                <DeviceDetails gpsData={gpsData} />
            }
        </>
    )
}

export default Debugger
