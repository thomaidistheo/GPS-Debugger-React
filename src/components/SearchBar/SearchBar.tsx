import React, { FC, useState } from 'react'
import styles from './SearchBar.module.scss'

import { SearchBarProps } from '../../types'

interface SearchBarProps {
    // Define any props here if needed
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
    const [imei, setImei] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const imeiRegex = /^\d+$/
        const cleanedImei = imei.replace(/\s+/g, '')
        
        if (!imeiRegex.test(cleanedImei)) {
            setErrorMsg('Only numbers allowed for IMEI')
            return
        } else if (!cleanedImei) {
            setErrorMsg('Enter a valid IMEI')
            return
        } else {
            setImei(cleanedImei)
            setErrorMsg('')
        }

        onSearch(cleanedImei) // Call the function directly
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

            {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
        </div>
    )
}

export default SearchBar
