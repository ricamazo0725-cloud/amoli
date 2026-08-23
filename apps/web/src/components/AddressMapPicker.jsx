// Muestra un mapa con un pin arrastrable centrado en la dirección
// seleccionada por el autocompletado. Si el cliente arrastra el pin
// (porque su casa queda en otra esquina, entrada distinta, etc.),
// se hace reverse geocoding y se notifica la nueva posición/dirección.
//
// Uso:
//   <AddressMapPicker
//     lat={coords?.lat}
//     lng={coords?.lng}
//     onPinMove={({ lat, lng, address }) => { ... }}
//   />

import { useEffect, useRef } from 'react';
import { useGoogleMapsScript } from '@/hooks/useGoogleMapsScript';

// Mismo centro por defecto que usas en usePlacesAutocomplete (Medellín)
const DEFAULT_CENTER = { lat: 6.2442, lng: -75.5812 };
const DEFAULT_ZOOM = 15;
const SELECTED_ZOOM = 17;

export function AddressMapPicker({ lat, lng, onPinMove }) {
    const { isLoaded } = useGoogleMapsScript();
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const geocoderRef = useRef(null);
    const onPinMoveRef = useRef(onPinMove);
    onPinMoveRef.current = onPinMove;

    // Crear el mapa y el marcador una sola vez, cuando el script ya cargó
    useEffect(() => {
        if (!isLoaded || !containerRef.current || mapRef.current) return;

        const center = lat && lng ? { lat, lng } : DEFAULT_CENTER;

        const map = new window.google.maps.Map(containerRef.current, {
            center,
            zoom: lat && lng ? SELECTED_ZOOM : DEFAULT_ZOOM,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: 'greedy',
        });

        const marker = new window.google.maps.Marker({
            position: center,
            map,
            draggable: true,
        });

        marker.addListener('dragend', () => {
            const pos = marker.getPosition();
            const newLat = pos.lat();
            const newLng = pos.lng();

            geocoderRef.current.geocode({ location: { lat: newLat, lng: newLng } }, (results, status) => {
                const address = status === 'OK' && results[0] ? results[0].formatted_address : null;
                onPinMoveRef.current?.({ lat: newLat, lng: newLng, address });
            });
        });

        geocoderRef.current = new window.google.maps.Geocoder();
        mapRef.current = map;
        markerRef.current = marker;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);

    // Cuando cambian lat/lng desde afuera (el cliente eligió otra dirección
    // en el autocompletado), recentrar el mapa y mover el pin sin recrearlo
    useEffect(() => {
        if (!mapRef.current || !markerRef.current || !lat || !lng) return;
        const position = { lat, lng };
        markerRef.current.setPosition(position);
        mapRef.current.panTo(position);
        mapRef.current.setZoom(SELECTED_ZOOM);
    }, [lat, lng]);

    if (!isLoaded) {
        return (
            <div className="flex h-64 w-full items-center justify-center rounded-sm border border-border bg-secondary text-sm text-muted-foreground">
                Cargando mapa...
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
                Arrastra el pin si tu casa queda en otra esquina
            </p>
            <div ref={containerRef} className="h-64 w-full rounded-sm border border-border" />
        </div>
    );
}
