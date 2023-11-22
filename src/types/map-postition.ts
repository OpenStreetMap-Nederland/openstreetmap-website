import { Map } from "leaflet";

export type MapPostition = {
  zoom: number;
  lat: number;
  lng: number;
};

export function getMapPositionFromMap(map: Map): MapPostition {
  const center = map.getCenter();
  const zoom = map.getZoom();
  return { zoom, lat: center.lat, lng: center.lng };
}

export function mapToHash(map: Map): string {
  const center = map.getCenter();
  const zoom = map.getZoom();
  return `#map=${zoom}/${center.lat.toFixed(4)}/${center.lng.toFixed(4)}`;
}

export function mapPositionToHash(mapPostition: MapPostition): string {
  return `#map=${mapPostition.zoom}/${mapPostition.lat.toFixed(4)}/${mapPostition.lng.toFixed(4)}`;
}

export function getMapPositionFromHash(hash: string): MapPostition | null {
  const match = hash.match(/^#map=(\d+)\/(-?\d+\.\d+)\/(-?\d+\.\d+)$/);
  
  if (match) {
    const [, zoom, lat, lng] = match;

    return { zoom: parseInt(zoom, 10), lat: parseFloat(lat), lng: parseFloat(lng) };
  } 

  return null;
}