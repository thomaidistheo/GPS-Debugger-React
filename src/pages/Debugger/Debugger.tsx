import { useState, useEffect } from 'react';
import styles from './Debugger.module.scss';

import DeviceDetails from "../../components/DeviceDetails/DeviceDetails";
import SearchBar from "../../components/SearchBar/SearchBar";
import AssetList from "../../components/AssetList/AssetList"

import fetchDeviceData from '../../components/fetchers/DeviceDataFetcher';
import { GpsData } from '../../types';
import OpenStreetMap from '../../components/OpenStreetMap/OpenStreetMap';
import NewAssetPopup from '../../components/NewAssetPopup/NewAssetPopup';
import { deleteDoc, doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { signOut } from 'firebase/auth';
// import { StorageError } from 'firebase/storage';
import { FirebaseError } from 'firebase/app';
import LoadingScreen from '../../components/Loading/LoadingScreen';
import deleteIcon from '../../assets/delete.svg'

type assetDataProps = {
    imei: string;
    name: string;
}

const Debugger = () => {
    const [gpsData, setGpsData] = useState<GpsData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imei, setImei] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [error, setError] = useState<string>('')

    const updateInterval = 5000;

    const fetchDeviceDataWithInterval = (imei: string) => {
        fetchDeviceData(imei, (data: GpsData | null, error: string | null) => {
            setIsLoading(false);
            if (error) {
                setError(error)
                console.log(error);
                setGpsData(null)
            } else {
                setGpsData(data);
                console.log('data fetched:', imei);
            }
        });
    };

    useEffect(() => {
        if (imei) {
            console.log(imei)
            setIsLoading(true)
            const intervalId = setInterval(() => {
                fetchDeviceDataWithInterval(imei)
            }, updateInterval)
            fetchDeviceDataWithInterval(imei);

            return () => clearInterval(intervalId)
        }
    }, [imei]);

    const handleFetchData = (newImei: string) => {
        console.log(newImei)
        setImei(newImei);
    };

    const handleSavedAssetData = (imei: string, name: string) => {
        setImei(imei);
        setName(name)
        console.log(imei)
        console.log(name)
    }

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

    const handleDeleteAsset = async (imeiToDelete: string) => {
        const user = auth.currentUser;
        if (imeiToDelete && user) {
            const assetsRef = collection(db, 'users', user.uid, 'assets');
            const q = query(assetsRef, where('imei', '==', imeiToDelete));

            try {
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    // Delete the first asset that matches the IMEI
                    const assetToDelete = querySnapshot.docs[0];
                    console.log('assetToDelete: ', assetToDelete);
                    console.log('assetToDelete.ref: ', assetToDelete.ref);
                    await deleteDoc(assetToDelete.ref);
                    console.log('asset deleted: ', assetToDelete.ref);
                } else {
                    // no asset with the provided imei
                    console.log('No asset with the provided IMEI found');
                }
            } catch (error) {
                console.log('Error deleting asset: ', error);
            }
        } else {
            console.log('IMEI is null or undefined');
        }
    }

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('User signed out successfully');
            // Additional logic after successful sign out (e.g., redirecting the user)
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                console.error('Error signing out:', error.message);
            }
        }
    }

    return (
        <>
            {isLoading
                ? <LoadingScreen />
                : (
                    <>
                        <SearchBar onSearch={handleFetchData} />
                        <AssetList setShowPopup={setShowPopup} onAssetSelect={handleSavedAssetData} />
                        {showPopup && (
                            <NewAssetPopup
                                onAdd={handleNewAsset}
                                setShowPopup={setShowPopup}
                            />
                        )}
                        {gpsData ? (
                            <div className={styles.deviceDetailsSection}>
                                <div className={styles.assetHeader}>
                                    <h2 className={styles.assetName}>{name}</h2>
                                    <button onClick={() => handleDeleteAsset(imei)} className={styles.assetSettings}><img src={deleteIcon} alt="Settings" draggable="false" /></button>
                                </div>
                                <OpenStreetMap gpsData={gpsData} />
                                <DeviceDetails gpsData={gpsData} />
                            </div>
                        ) : (
                            <div className={styles.resultPlaceholder}>
                                {!error ? (
                                    <p>Device details will be shown here.</p>
                                ) : (
                                    <div className={styles.notFound}>
                                        <p>IMEI not found.</p>
                                        <button onClick={() => handleDeleteAsset(imei)} className={styles.assetSettings}><img src={deleteIcon} alt="Settings" draggable="false" /></button>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            <button onClick={handleSignOut}>Sign Out</button>
        </>
    )
}
export default Debugger;
