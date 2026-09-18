// Zona de entrega "mismo día": polígono dibujado a mano por el dueño de
// AMOLI en Google My Maps (zona sur del Valle de Aburrá hasta Laureles:
// La Estrella, Sabaneta, Itagüí, Envigado, El Poblado, y subiendo por el
// oriente hasta Las Palmas — Santa Elena queda deliberadamente FUERA —
// y de vuelta por el norte).
//
// Tomado del KML exportado el 2026-09-18. Dos ajustes hechos a mano sobre
// el trazo original:
//   1. Un tramo sin cerrar de ~3 km entre (6.2215913, -75.6021643) y
//      (6.1942865, -75.6071425) — cerca de Robledo/Calasanz, al norte de
//      Laureles — se cerró con una línea recta directa.
//   2. El trazo original se extendía hasta cerca de Santa Elena/El Retiro
//      (lng ~ -75.51); se recortó para que el límite oriental quede en
//      Las Palmas / Alto de las Palmas (lng ~ -75.535 a -75.542, con
//      margen para que Alto de las Palmas quede claramente dentro) y
//      Santa Elena quede excluida.
// Si quieres que estos bordes sean más precisos, dibújalos en My Maps y
// vuelve a exportar.
//
// Para volver a ajustar el polígono completo:
//   1. Dibuja el área real en Google My Maps (mymaps.google.com), gratis.
//   2. Exporta como KML y copia las coordenadas (lat, lng) de cada punto.
//   3. Reemplaza el array SAME_DAY_ZONE_POLYGON de abajo, respetando el
//      orden (el polígono se cierra automáticamente del último punto al
//      primero).
//
// Requiere que useGoogleMapsScript cargue la librería "geometry" (ya
// incluida en el script) para poder usar
// google.maps.geometry.poly.containsLocation.
export const SAME_DAY_ZONE_POLYGON = [
  { lat: 6.1737385, lng: -75.6330578 },
  { lat: 6.1669972, lng: -75.6445162 },
  { lat: 6.1607251, lng: -75.6458895 },
  { lat: 6.1585491, lng: -75.6507818 },
  { lat: 6.1540668, lng: -75.6504045 },
  { lat: 6.1520187, lng: -75.6554685 },
  { lat: 6.1511227, lng: -75.6533227 },
  { lat: 6.1532134, lng: -75.6490312 },
  { lat: 6.1505253, lng: -75.6493745 },
  { lat: 6.1494159, lng: -75.6486449 },
  { lat: 6.1495439, lng: -75.6452546 },
  { lat: 6.1483065, lng: -75.6436239 },
  { lat: 6.1486479, lng: -75.6407485 },
  { lat: 6.1465571, lng: -75.6389032 },
  { lat: 6.1438805, lng: -75.6403194 },
  { lat: 6.1410856, lng: -75.6380878 },
  { lat: 6.1406803, lng: -75.6296978 },
  { lat: 6.1461695, lng: -75.6287702 },
  { lat: 6.1453588, lng: -75.627354 },
  { lat: 6.1449107, lng: -75.6241997 },
  { lat: 6.1423293, lng: -75.6219681 },
  { lat: 6.1394491, lng: -75.6221827 },
  { lat: 6.1399611, lng: -75.6202086 },
  { lat: 6.1402598, lng: -75.6182774 },
  { lat: 6.1356089, lng: -75.6162604 },
  { lat: 6.1381264, lng: -75.612398 },
  { lat: 6.1357795, lng: -75.6139001 },
  { lat: 6.1349688, lng: -75.6122264 },
  { lat: 6.1360356, lng: -75.6101235 },
  { lat: 6.1358222, lng: -75.6060895 },
  { lat: 6.1354808, lng: -75.6016263 },
  { lat: 6.1421373, lng: -75.6008967 },
  { lat: 6.1446547, lng: -75.6013688 },
  { lat: 6.1469162, lng: -75.5997809 },
  { lat: 6.1527611, lng: -75.5957919 },
  { lat: 6.150457, lng: -75.5896979 },
  { lat: 6.1469582, lng: -75.5825739 },
  { lat: 6.1341575, lng: -75.5717593 },
  { lat: 6.1250, lng: -75.5420 }, // vía Las Palmas (sur), antes de El Retiro/Santa Elena
  { lat: 6.1550, lng: -75.5380 }, // Alto de las Palmas queda claramente dentro
  { lat: 6.1850, lng: -75.5350 }, // límite oriental — Santa Elena queda fuera
  { lat: 6.2059662, lng: -75.5381919 },
  { lat: 6.2211543, lng: -75.5589629 },
  { lat: 6.2330997, lng: -75.5623961 },
  { lat: 6.2431678, lng: -75.5728675 },
  { lat: 6.2498228, lng: -75.5780173 },
  { lat: 6.2532356, lng: -75.5850554 },
  { lat: 6.2539182, lng: -75.6015349 },
  { lat: 6.248799, lng: -75.6071998 },
  { lat: 6.241632, lng: -75.6125213 },
  { lat: 6.2336117, lng: -75.610118 },
  { lat: 6.2215913, lng: -75.6021643 },
  { lat: 6.1942865, lng: -75.6071425 }, // cierre directo del tramo sin dibujar
  { lat: 6.1768789, lng: -75.6086016 },
  // el polígono se cierra solo de vuelta al primer punto (6.1737385, -75.6330578)
];

/**
 * Evalúa si un punto (lat, lng) cae dentro del polígono de entrega el
 * mismo día. Solo informativo: NO bloquea el pedido, AMOLI envía a toda
 * Colombia por transportadora (ver PAYMENT_METHODS en CheckoutClient).
 *
 * @param {number} lat
 * @param {number} lng
 * @returns {boolean|null} true/false si se pudo evaluar, o null si la
 *   librería "geometry" de Google Maps todavía no ha cargado.
 */
export function isInSameDayDeliveryZone(lat, lng) {
  if (typeof window === 'undefined' || !window.google?.maps?.geometry?.poly) {
    return null;
  }
  if (typeof lat !== 'number' || typeof lng !== 'number') return null;

  const point = new window.google.maps.LatLng(lat, lng);
  const path = SAME_DAY_ZONE_POLYGON.map(
    ({ lat: pLat, lng: pLng }) => new window.google.maps.LatLng(pLat, pLng)
  );
  const polygon = new window.google.maps.Polygon({ paths: path });
  return window.google.maps.geometry.poly.containsLocation(point, polygon);
}
