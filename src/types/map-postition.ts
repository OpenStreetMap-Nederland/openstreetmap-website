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
  return `#map=${mapPostition.zoom}/${mapPostition.lat.toFixed(
    4
  )}/${mapPostition.lng.toFixed(4)}`;
}

export function getMapPositionFromHash(hash: string): MapPostition | null {
  const match = hash.match(/(#map=[^?]+)/);

  const mapHash = match ? match[0] : null;
  const mapHashSplit = mapHash?.replace("#map=", "").split("/");

  if (mapHashSplit) {
    const [zoom, lat, lng] = mapHashSplit;

    let latD = addDecimalsToStringNumber(lat, 4);
    let lngD = addDecimalsToStringNumber(lng, 4);

    return {
      zoom: parseInt(zoom, 10),
      lat: parseFloat(latD),
      lng: parseFloat(lngD),
    };
  }

  return null;
}

function addDecimalsToStringNumber(number: string, decimals: number) {
  if (number.indexOf(".") === -1) {
    return number + "." + "0".repeat(decimals);
  }

  let [integer, decimal] = number.split(".");

  if (decimal.length === decimals) {
    return number;
  }

  if (decimal.length > decimals) {
    return integer + "." + decimal.slice(0, decimals);
  }

  if (decimal.length < decimals) {
    return integer + "." + decimal + "0".repeat(decimals - decimal.length);
  }

  return number;
}
