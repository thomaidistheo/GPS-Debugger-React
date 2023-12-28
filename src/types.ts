export interface SearchBarProps {
    onSearch: (imei: string) => void;
}

export interface GpsData {
    Imei: string;
    Date: string;
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
    // other fields as needed...
}

export interface DeviceDetailsProps {
    gpsData: GpsData | null;
}
