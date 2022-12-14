import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from '../../../public/pin.png';

export default function Map(
    {
        className,
        bounds,
        marker,
    }: {
        className?: string,
        bounds: number[][],
        marker: {
            title: string
            subname: string
            position: number[]
        }[],
    }
) {
    useEffect(() => {
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: iconRetinaUrl.src,
            iconUrl: iconUrl.src,
            shadowUrl: '',
            iconSize: [50, 50],
            className: 'object-contain',
            iconAnchor: [25, 30],
        })
    }, [])

    return (
        <MapContainer
            bounds={bounds as L.LatLngBoundsExpression}
            center={bounds.length > 1 ? undefined : bounds[0] as L.LatLngExpression}
            className={`w-full ${className}`}
            attributionControl={false}
            maxZoom={18}
            minZoom={1}
            zoom={15}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {marker?.map(({ title, subname, position }, index) => (
                <Marker key={index} position={position as L.LatLngExpression}>
                    <Popup>
                        <h1 className='text-xs text-center font-bold'>{title}</h1>
                        <h1 className='text-[12px] text-center'>{subname}</h1>
                    </Popup>
                </Marker>
            ))}
        </MapContainer >
    )
}
