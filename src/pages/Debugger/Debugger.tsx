import { useState, useEffect } from 'react';
import styles from './Debugger.module.scss';
import { DebuggerProps } from '../../types';

import DeviceDetails from "../../components/DeviceDetails/DeviceDetails";
import SearchBar from "../../components/SearchBar/SearchBar";

import fetchDeviceData from '../../components/fetchers/DeviceDataFetcher';
import loadingGif from '../../assets/loading-ripple.gif';
import { GpsData } from '../../types';
import OpenStreetMap from '../../components/OpenStreetMap/OpenStreetMap';

const Debugger: React.FC<DebuggerProps> = () => {
    const [gpsData, setGpsData] = useState<GpsData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imei, setImei] = useState<string>('');

    const updateInterval = 5000;

    const fetchDeviceDataWithInterval = (imei:string) => {

        fetchDeviceData(imei, (data: GpsData | null, error: string | null) => {
            setIsLoading(false);
            if (error) {
                console.log(error);
            } else {
                setGpsData(data);
                console.log('Data fetched');
            }
        });
    };

    useEffect(() => {
        if (imei) {
            setIsLoading(true);
            fetchDeviceDataWithInterval(imei);
            const intervalId = setInterval(fetchDeviceDataWithInterval, updateInterval);
            return () => clearInterval(intervalId);
        }
    }, [imei]);

    const handleFetchData = (newImei: string) => {
        setImei(newImei);
    };

    return (
        <>
            {isLoading ? (
                <div className={styles.loadingScreen}>
                    <img src={loadingGif} alt="Loading..." />
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
                        <div className={styles.resultPlaceholder}>Device details will be shown here.</div>
                    )}
                </>
            )}
        </>
    );
}

export default Debugger;
