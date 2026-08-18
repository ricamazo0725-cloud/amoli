// Conecta el widget de autocompletado de Google Places a un <input> de
// dirección. Restringe resultados a Colombia y sesga hacia el Valle de
// Aburrá (Medellín), ya que es donde AMOLI hace entregas.
//
// Uso:
//   const addressInputRef = useRef(null);
//   const { isLoaded } = usePlacesAutocomplete(addressInputRef, {
//     onPlaceSelected: (place) => { ... },
//   });
//   <Input ref={addressInputRef} ... />

import { useEffect, useRef } from 'react';
import { useGoogleMapsScript } from './useGoogleMapsScript';

// Centro aproximado de Medellín, usado para priorizar resultados cercanos
// sin restringir estrictamente a la ciudad (el usuario puede escribir otra
// dirección del área metropolitana o del país).
const MEDELLIN_BOUNDS = {
  north: 6.35,
  south: 6.1,
  east: -75.45,
  west: -75.7,
};

/**
 * @param {React.RefObject<HTMLInputElement>} inputRef
 * @param {{ onPlaceSelected?: (place: google.maps.places.PlaceResult) => void }} options
 */
export function usePlacesAutocomplete(inputRef, { onPlaceSelected } = {}) {
  const { isLoaded, loadError } = useGoogleMapsScript();
  const autocompleteRef = useRef(null);
  const onPlaceSelectedRef = useRef(onPlaceSelected);
  onPlaceSelectedRef.current = onPlaceSelected;

  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'co' },
      fields: ['formatted_address', 'address_components', 'geometry'],
      types: ['address'],
      bounds: MEDELLIN_BOUNDS,
    });

    const listener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place?.formatted_address) {
        if (inputRef.current) {
          inputRef.current.value = place.formatted_address;
        }
        onPlaceSelectedRef.current?.(place);
      }
    });

    autocompleteRef.current = autocomplete;

    return () => {
      window.google?.maps?.event?.removeListener(listener);
      autocompleteRef.current = null;
    };
  }, [isLoaded, inputRef]);

  return { isLoaded, loadError };
}

/**
 * Extrae la ciudad de un place de Google (address_components), buscando
 * primero "locality" y luego "administrative_area_level_2" como respaldo.
 * @param {google.maps.places.PlaceResult} place
 * @returns {string|null}
 */
export function getCityFromPlace(place) {
  const components = place?.address_components || [];
  const locality = components.find((c) => c.types.includes('locality'));
  if (locality) return locality.long_name;
  const fallback = components.find((c) => c.types.includes('administrative_area_level_2'));
  return fallback ? fallback.long_name : null;
}