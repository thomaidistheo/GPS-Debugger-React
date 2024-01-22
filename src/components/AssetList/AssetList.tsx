import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

import styles from './AssetList.module.scss';
import CircleAdd from '../../assets/circle-add.svg';

function AssetList({ setShowPopup }) {
    
    return (
        <div className={styles.assetListContainer}>
            <ul>
                <li className="asset">
                    <button className={styles.addBtn} onClick={() => setShowPopup(true)}>
                        <img src={CircleAdd} alt="Add" />
                    </button>
                </li>
                <li className="asset">Asset 1</li>
                <li className="asset">Asset 1</li>
                <li className="asset">Asset 1</li>
            </ul>
        </div>
    )
}

export default AssetList