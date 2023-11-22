import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import { LeafletEvent, Map } from "leaflet";
import {
  MapPostition,
  getMapPositionFromHash,
  mapPositionToHash,
} from "@/types/map-postition";

export function MapUrl() {
  const writeEventMapPositionToUrl = (e: LeafletEvent) => {
    const map = e.target as Map;
    const mapPostition: MapPostition = {
      lat: map.getCenter().lat,
      lng: map.getCenter().lng,
      zoom: map.getZoom(),
    };

    localStorage.setItem("mapPostition", JSON.stringify(mapPostition));
    window.history.replaceState(null, "", mapPositionToHash(mapPostition));
  };

  const writeMapPositionToUrl = (mapPostition: MapPostition) => {
    localStorage.setItem("mapPostition", JSON.stringify(mapPostition));
    window.history.replaceState(null, "", mapPositionToHash(mapPostition));
  };

  const readMapPositionFromUrl = () => {
    const mapPostition: MapPostition | null = getMapPositionFromHash(
      window.location.hash
    );

    return mapPostition;
  };

  const readMapPositionFromLocalStorage = () => {
    const mapPostionString: string | null =
      localStorage.getItem("mapPostition");

    if (!mapPostionString) {
      return null;
    }

    const mapPostition: MapPostition = JSON.parse(mapPostionString);

    return mapPostition;
  };

  const mapPostition: MapPostition | null = readMapPositionFromUrl();
  const map = useMap();

  if (mapPostition) {
    map.setView([mapPostition.lat, mapPostition.lng], mapPostition.zoom);
    writeMapPositionToUrl(mapPostition);
  } else {
    const mapPostition: MapPostition | null = readMapPositionFromLocalStorage();

    if (mapPostition) {
      map.setView([mapPostition.lat, mapPostition.lng], mapPostition.zoom);
      writeMapPositionToUrl(mapPostition);
    }
  }

  useMapEvents({
    moveend(e) {
      writeEventMapPositionToUrl(e);
    },
    zoomend(e) {
      writeEventMapPositionToUrl(e);
    },
    viewreset(e) {
      writeEventMapPositionToUrl(e);
    },
  });

  return null;
}
