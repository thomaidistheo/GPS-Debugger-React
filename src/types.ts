export interface DebuggerProps {

}

export interface NewAssetPopupProps {
    onAdd: (assetData: object) => void;
}

export interface SearchBarProps {
    onSearch: (imei: string) => void;
}

export interface GpsData {
    Imei: string;
    GPSDate: string;
    Latitude: number;
    Longitude: number;
    RoadName: string;
    IsIgnitionOn: boolean;
    VehicleSpeed: number;
    Armed: boolean;
    Door: string;
    EventID: string;
    EventName: string;
    Protocol: string;
    RawData: string;
    // other fields as needed...
}

export interface DeviceDetailsProps {
    gpsData: GpsData | null;
}

export interface OpenStreetMapProps {
    gpsData: GpsData;
}