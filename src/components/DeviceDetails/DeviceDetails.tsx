import React from 'react';
import styles from '../DeviceDetails/DeviceDetails.module.scss'
import { GpsData } from '../../types.ts'
import { gpsData } from '../../types.ts'

const DeviceDetails: React.FC<DeviceDetailsProps> = ({ gpsData }) => {
    if (!gpsData) {
        return null;
    }

    return (
        <div className={styles.deviceDetailsSection}>
            <div className={styles.mapContainer}>
                <div className={styles.map}>MAP</div>
            </div>
            <div className={styles.deviceDetailsContainer}>
                <h3>Device Information</h3>
                <ul>
                    <li>
                        <span className={styles.label}>IMEI</span>
                        <span>{gpsData.Imei}</span>
                    </li>
                    <div className={styles.separator}></div>
                    <li>
                        <span className={styles.label}>DATE</span>
                        <span>{gpsData.GPSDate}</span>
                    </li>
                    <div className={styles.separator}></div>
                    <li>
                        <span className={styles.label}>Latitude</span>
                        <span>{gpsData.Latitude}</span>
                    </li>
                    <li>
                        <span className={styles.label}>Longitude</span>
                        <span>{gpsData.Longitude}</span>
                    </li>
                    <li>
                        <span className={styles.label}>Coordinates</span>
                        <span>{gpsData.Latitude}, {gpsData.Longitude}</span>
                    </li>
                    <li>
                        <span className={styles.label}>Road Name</span>
                        <span>{gpsData.RoadName}</span>
                    </li>
                    <div className={styles.separator}></div>
                    <li>
                        <span className={styles.label}>Ignition</span>
                        <span>{gpsData.IsIgnitionOn}</span>    
                    </li>
                    <li>
                        <span className={styles.label}>Speed</span>
                        <span>{gpsData.VehicleSpeed}</span>    
                    </li>
                    <li>
                        <span className={styles.label}>Armed</span>
                        <span>{gpsData.Armed}</span>    
                    </li>
                    <li>
                        <span className={styles.label}>Door</span>
                        <span>{gpsData.Door}</span>    
                    </li>
                    <div className={styles.separator}></div>
                    <li>
                        <span className={styles.label}>Event ID</span>
                        <span>{gpsData.EventID}</span>
                    </li>
                    <li>
                        <span className={styles.label}>Event Name</span>
                        <span id="eventName">{gpsData.EventName}</span>
                    </li>
                    <li>
                        <span className={styles.label}>Protocol</span>
                        <span>{gpsData.Protocol}</span>
                    </li>
                    {/* <div className={styles.separator}></div> */}
                    {/* <li>
                        <span className={styles.label}>Raw Data</span>
                        <span>{gpsData.RawData}</span>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default DeviceDetails;
