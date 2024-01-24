import React from 'react'

import loadingGif from '../../assets/loading-ripple.gif';
import styles from './LoadingScreen.module.scss'

const LoadingScreen = () => {
    return (
        <div className={styles.loadingScreen}>
            <div className={styles.imgCont}>
                <img src={loadingGif} alt="Loading..." />

            </div>
        </div>
    )
}

export default LoadingScreen