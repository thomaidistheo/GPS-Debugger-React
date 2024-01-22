import React, { useState } from 'react'
import styles from './NewAssetPopup.module.scss'

import { NewAssetPopupProps } from '../../types';

const NewAssetPopup: React.FC<NewAssetPopupProps> = ({ onAdd }) => {
    const [imei, setImei] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const imeiRegex = /^\d+$/

        if (!imei) {
            setErrorMsg('Enter a valid IMEI')
        } else {
            const cleanedImei = imei.replace(/\s+/g, '')

            if (!imeiRegex.test(cleanedImei)) {
                setErrorMsg('Only numbers allowed for IMEI')
                return
            } else if (!cleanedImei) {
                setErrorMsg('Enter a valid IMEI')
                return
            } else {
                setImei(cleanedImei)
                onAdd({ imei, name })
                setErrorMsg('')
            }
        }
    }

    return (
        <div className={styles.popUpContainer}>
            <form className={styles.popUpForm} onSubmit={handleSubmit}>
                <p className={styles.popupTitle}>Add new asset</p>
                <div className={styles.inputsContainer}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="inputImei" className={styles.label}>IMEI</label>
                        <input 
                            className={ errorMsg ? `${styles.input} ${styles.inputError}` : `${styles.input}` }
                            name='inputImei'
                            id="inputImei" 
                            type="text" 
                            placeholder="Enter device IMEI" 
                            value={imei} 
                            onChange={(e) => setImei(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="inputImei" className={styles.label}>Name</label>
                        <input 
                            className={styles.input}
                            name='inputName'
                            id="inputName" 
                            type="text" 
                            placeholder="Enter device Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            maxLength={12}
                        />
                    </div>
                </div>
                
                <button type="submit" id="inputSubmit" className={styles.inputBtn}>Add</button>

            </form>

            {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}

        </div>
    )
}

export default NewAssetPopup