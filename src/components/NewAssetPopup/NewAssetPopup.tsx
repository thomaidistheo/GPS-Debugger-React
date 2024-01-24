import React, { useState } from 'react'
import styles from './NewAssetPopup.module.scss'
import closeIcon from '../../assets/close.svg'

import { assetDataProps } from '../../types'

type NewAssetPopupProps = {
    onAdd: (assetData: assetDataProps) => Promise<void>,
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewAssetPopup: React.FC<NewAssetPopupProps> = ({ onAdd, setShowPopup }) => {
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

    const handleClose = () => {
        console.log('close form')
        setShowPopup(false)
    }

    return (
        <div className={styles.popUpContainer}>
            <form className={styles.popUpForm} onSubmit={handleSubmit}>
                <button className={styles.closeBtn} onClick={handleClose}>
                    <img src={closeIcon} alt="Cancel" draggable="false"/>
                </button>
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