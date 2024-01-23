import { useState, useEffect } from 'react';
import styles from './Debugger.module.scss';

import DeviceDetails from "../../components/DeviceDetails/DeviceDetails";
import SearchBar from "../../components/SearchBar/SearchBar";
import AssetList from "../../components/AssetList/AssetList"

import fetchDeviceData from '../../components/fetchers/DeviceDataFetcher';
import loadingGif from '../../assets/loading-ripple.gif';
import { GpsData } from '../../types';
import OpenStreetMap from '../../components/OpenStreetMap/OpenStreetMap';
import NewAssetPopup from '../../components/NewAssetPopup/NewAssetPopup';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { signOut } from 'firebase/auth';
// import { StorageError } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';

type assetDataProps = {
    imei: string;
    name: string;
}

const Debugger = () => {
    const [gpsData, setGpsData] = useState<GpsData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imei, setImei] = useState<string>('');
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const updateInterval = 5000;

    const fetchDeviceDataWithInterval = (imei: string) => {
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
            console.log(imei)
            setIsLoading(true)
            setInterval(() => {
                fetchDeviceDataWithInterval(imei)
            }, updateInterval)
            fetchDeviceDataWithInterval(imei);
        }
    }, [imei]);

    const handleFetchData = (newImei: string) => {
        console.log(newImei)
        setImei(newImei);
        console.log(imei)
    };

    const handleNewAsset = async (assetData: assetDataProps) => {
        setShowPopup(false)
        const { imei, name } = assetData

        const user = auth.currentUser;

        if (user) {
            // Reference to the user's assets collection
            const assetsRef = collection(db, 'users', user.uid, 'assets');
            // Query for an asset with the provided IMEI
            const q = query(assetsRef, where('imei', '==', imei));

            try {
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    // No asset with the same IMEI exists, create a new one
                    const newAssetRef = doc(assetsRef); // Let Firestore generate a new ID
                    await setDoc(newAssetRef, { imei, name });
                    console.log('New asset added:', newAssetRef.id);
                } else {
                    // An asset with this IMEI already exists
                    console.log('An asset with this IMEI already exists');
                }
            } catch (error) {
                console.error('Error accessing Firestore:', error);
            }
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('User signed out successfully');
            // Additional logic after successful sign out (e.g., redirecting the user)
        } catch (error: unknown) {
            if (error instanceof FirebaseError ) {
                console.error('Error signing out:', error.message);
            }
        }
    }

        return (
            <>
                {isLoading ? (
                    <div className={styles.loadingScreen}>
                        <img src={loadingGif} alt="Loading..." />
                    </div>
                ) : (
                    <>
                        <SearchBar onSearch={handleFetchData} />
                        <AssetList setShowPopup={setShowPopup} />
                        <button onClick={handleSignOut}>Sign Out</button>
                        {showPopup && (
                            <NewAssetPopup onAdd={handleNewAsset} />
                        )}
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
