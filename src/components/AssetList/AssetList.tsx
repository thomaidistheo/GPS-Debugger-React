import React, { useEffect, useState } from 'react'
import styles from './AssetList.module.scss';
import CircleAdd from '../../assets/circle-add.svg';
import { auth, db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { FirebaseError } from 'firebase/app';

type Asset = {
    id: string;
    imei: string;
    name: string;
}

type AssetListProps = {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
    onAssetSelect: (imei: string, name: string) => void,
}

const AssetList: React.FC<AssetListProps> = ({ setShowPopup, onAssetSelect }) => {
    const [assets, setAssets] = useState<Asset[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const handleAssetSelect = (event:React.MouseEvent<HTMLLIElement>) => {
        const selectedIMEI = event.currentTarget.dataset.imei;
        const selectedName = event.currentTarget.dataset.name;
        if (selectedIMEI && selectedName) {
            onAssetSelect(selectedIMEI, selectedName);
        } else {
            console.log('something went wrong - 1001')
        }
    };

    useEffect(() => {
        const fetchAssets = async () => {
            setLoading(true)
            const user = auth.currentUser

            if (user) {
                const assetsRef = collection(db, 'users', user.uid, 'assets')

                try {
                    const querySnapshot = await getDocs(assetsRef)
                    const assetsList: Asset[] = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        imei: doc.data().imei,
                        name: doc.data().name,
                    }))

                    setAssets(assetsList)
                } catch (error: unknown) {
                    if (error instanceof FirebaseError) {
                        console.log('error fetching assets list', error)
                    }
                }
            }
            setLoading(false);
        }
        fetchAssets()

    }, [])

    return (
        <div className={styles.assetListContainer}>
            <ul>
                <li className="asset">
                    <button className={styles.addBtn} onClick={() => setShowPopup(true)}>
                        <img src={CircleAdd} alt="Add" draggable="false" />
                    </button>
                </li>
                {loading
                    ? <p> Loading assets... </p>
                    : assets.map((asset) => (
                        <li key={asset.id} data-imei={asset.imei} data-name={asset.name} onClick={handleAssetSelect}>
                            {asset.name}
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default AssetList

