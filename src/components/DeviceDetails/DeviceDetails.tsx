import React from 'react';
import styles from '../DeviceDetails/DeviceDetails.module.scss'
import { DeviceDetailsProps } from '../../types';

const DeviceDetails: React.FC<DeviceDetailsProps> = ({ gpsData }) => {
    if (!gpsData) {
        return null
    }

    return (
        <>
            <div className={styles.deviceDetailsContainer}>
                <h3>Device Information</h3>
                <ul>
                    <li>
                        <div className={styles.label}>IMEI</div>
                        <div>{gpsData.Imei}</div>
                    </li>
                    <div className={styles.separator}></div>
                    <li>
                        <div className={styles.label}>DATE</div>
                        <div>{gpsData.GPSDate}</div>
                    </li>
                    <div className={styles.separator}></div>
                    <li>
                        <div className={styles.label}>Latitude</div>
                        <div>{gpsData.Latitude}</div>
                    </li>
                    <li>
                        <div className={styles.label}>Longitude</div>
                        <div>{gpsData.Longitude}</div>
                    </li>
                    <li>
                        <div className={styles.label}>Coordinates</div>
                        <div>{gpsData.Latitude},{gpsData.Longitude}</div>
                    </li>
                    <li>
                        <div className={styles.label}>Road Name</div>
                        <div>{gpsData.RoadName}</div>
                    </li>
                    <div className={styles.separator}></div>
                    <li>
                        <div className={styles.label}>Ignition</div>
                        <div>{gpsData.IsIgnitionOn 
                            ? <span className={styles.success}> ON </span> 
                            : <span className={styles.error}> OFF </span> 
                            }
                        </div>    
                    </li>
                    <li>
                        <div className={styles.label}>Speed</div>
                        <div>{gpsData.VehicleSpeed}</div>    
                    </li>
                    <li>
                        <div className={styles.label}>Armed</div>
                        <div>{gpsData.Armed}</div>    
                    </li>
                    <li>
                        <div className={styles.label}>Door</div>
                        <div>{gpsData.Door}</div>    
                    </li>
                    <div className={styles.separator}></div>
                    <li>
                        <div className={styles.label}>Event ID</div>
                        <div>{gpsData.EventID}</div>
                    </li>
                    <li>
                        <div className={styles.label}>Event Name</div>
                        <div id="eventName">{gpsData.EventName}</div>
                    </li>
                    <li>
                        <div className={styles.label}>Protocol</div>
                        <div>{gpsData.Protocol}</div>
                    </li>
                    <div className={styles.separator}></div>
                    <li>
                        <div className={styles.label}>Raw Data</div>
                        <div className={styles.brakeText}>{gpsData.RawData}</div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default DeviceDetails;
