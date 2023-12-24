import React, { FC, useState } from 'react'
import fetchDeviceData from '../fetchers/DeviceDataFetcher'
import styles from './SearchBar.module.scss'

interface SearchBarProps {
    // Define any props here if needed
}

const SearchBar: FC<SearchBarProps> = () => {
    const [imei, setImei] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const imeiRegex = /^\d+$/
        const cleanedImei = imei.replace(/\s+/g, '')
        
        if (!imeiRegex.test(cleanedImei)) {
            setErrorMsg('Only numbers allowed for IMEI')
            return
        }

        if (!cleanedImei) {
            setErrorMsg('Enter a valid IMEI')
            return
        }
        setImei(cleanedImei)
        setIsLoading(true)
        setErrorMsg('')

        fetchDeviceData(cleanedImei, handleFetchComplete) // Call the function directly
    }

    const handleFetchComplete = (data: any, error: string | null) => {
        setIsLoading(false)
        if (error) {
            setErrorMsg(error)
        } else {
            console.log(data) // Process your data here
            setErrorMsg('')
        }
    }

    return (
        <div className={styles.searchSection}>
            <form className={styles.searchContainer} onSubmit={handleSubmit}>
                <input 
                    id="inputImei" 
                    type="text" 
                    placeholder="Enter device IMEI" 
                    value={imei} 
                    onChange={(e) => setImei(e.target.value)}
                />
                <button type="submit" id="inputSubmit">Search</button>
            </form>

            {isLoading && <div className={styles.loaderContainer}>Loading...</div>}
            {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
        </div>
    )
}

export default SearchBar
