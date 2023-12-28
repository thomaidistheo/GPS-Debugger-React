import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { OpenStreetMapProps } from '../../types';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

import styles from './OpenStreetMap.module.scss'

L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({ gpsData }) => {
    
    if (!gpsData || !gpsData.Latitude || !gpsData.Longitude) {
        return <div>Loading map...</div>;
    }

    const position: [number, number] = [gpsData.Latitude, gpsData.Longitude];

    return (
        <div className={styles.mapContainer}>
            <div className={styles.map}>
                <MapContainer 
                    center={position} 
                    zoom={17} 
                    style={{ 
                        height: '400px', 
                        width: '100%', 
                        borderRadius: '8px',
                    }}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution='© OpenStreetMap contributors, © CARTO'
                    />
                    <Marker position={position}>
                        <Popup>
                            Asset
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}

export default OpenStreetMap