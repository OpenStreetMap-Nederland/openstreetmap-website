import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import { LeafletEvent, Map } from "leaflet";
import {
  MapPostition,
  getMapPositionFromHash,
  mapPositionToHash,
} from "@/types/map-postition";

export function MapUrl() {
  const map = useMap();

  useEffect(() => {
    if (map === null) {
      return;
    }

    window.addEventListener("hashchange", () => {
      const mapPostition: MapPostition | null = getMapPositionFromHash(
        window.location.hash
      );

      if (!mapPostition) {
        return;
      }

      map.flyTo([mapPostition.lat, mapPostition.lng], mapPostition.zoom);
      writeMapPositionToUrl(mapPostition);
    });

    return () => {
      window.removeEventListener("hashchange", () => {
        const mapPostition: MapPostition | null = getMapPositionFromHash(
          window.location.hash
        );

        if (!mapPostition) {
          return;
        }

        writeMapPositionToUrl(mapPostition);
      });
    };
  }, [map]);

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

  // first try to read from the url
  let mapPostition: MapPostition | null = readMapPositionFromUrl();

  // if not found, try to read from localstorage
  if (!mapPostition) {
    mapPostition = readMapPositionFromLocalStorage();
  }

  // backup position
  if (!mapPostition) {
    mapPostition = {
      lat: 5.6462682,
      lng: 52.1009263,
      zoom: 8,
    };
  }

  // set the map position
  // and write it to the url and localstorage
  map.setView([mapPostition.lat, mapPostition.lng], mapPostition.zoom);
  writeMapPositionToUrl(mapPostition);

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
