export type MapPostition = {
  zoom: number;
  lat: number;
  lng: number;
};

export function getMapPositionFromMap(map: maplibregl.Map): MapPostition {
  const center = map.getCenter();
  const zoom = map.getZoom();
  return { zoom, lat: center.lat, lng: center.lng };
}

export function mapToHash(map: maplibregl.Map): string {
  const center = map.getCenter();
  const zoom = map.getZoom();
  return `#map=${zoom}/${center.lat.toFixed(4)}/${center.lng.toFixed(4)}`;
}

export function mapPositionToHash(mapPostition: MapPostition): string {
  return `#map=${mapPostition.zoom}/${mapPostition.lat.toFixed(
    4
  )}/${mapPostition.lng.toFixed(4)}`;
}

export const readMapPositionFromUrl = () => {
  const mapPostition: MapPostition | null = getMapPositionFromHash(
    window.location.hash
  );

  return mapPostition;
};

export const moveMapToPosition = (
  map: maplibregl.Map,
  mapPostition: MapPostition
) => {
  map.jumpTo({
    center: [mapPostition.lng, mapPostition.lat],
    zoom: mapPostition.zoom,
  });
};

export const writeEventMapPositionToUrl = (map: maplibregl.Map) => {
  if (!map) return;
  const mapPostition: MapPostition = {
    lat: map.getCenter().lat,
    lng: map.getCenter().lng,
    zoom: Math.round(map.getZoom() * 1000) / 1000,
  };

  localStorage.setItem("mapPostition", JSON.stringify(mapPostition));
  window.history.replaceState(null, "", mapPositionToHash(mapPostition));
};

export const writeMapPositionToUrl = (mapPostition: MapPostition) => {
  localStorage.setItem("mapPostition", JSON.stringify(mapPostition));
  window.history.replaceState(null, "", mapPositionToHash(mapPostition));
};

export const readMapPositionFromLocalStorage = () => {
  const mapPostionString: string | null = localStorage.getItem("mapPostition");

  if (!mapPostionString) {
    return null;
  }

  const mapPostition: MapPostition = JSON.parse(mapPostionString);

  return mapPostition;
};

export function getMapPositionFromHash(hash: string): MapPostition | null {
  const match = hash.match(/(#map=[^?]+)/);

  const mapHash = match ? match[0] : null;
  const mapHashSplit = mapHash?.replace("#map=", "").split("/");

  if (mapHashSplit) {
    const [zoom, lat, lng] = mapHashSplit;

    let zoomD = addDecimalsToStringNumber(zoom, 4);
    let latD = addDecimalsToStringNumber(lat, 4);
    let lngD = addDecimalsToStringNumber(lng, 4);

    return {
      zoom: parseFloat(zoomD),
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
