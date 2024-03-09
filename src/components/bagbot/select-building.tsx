import { parse } from "path";
import { useState, useMemo } from "react";
import { useMapEvents, Polygon, useMap } from "react-leaflet";

type Props = {
  onSelectBuilding?: (building: Building | null) => void;
};

export default function SelectBuilding({ onSelectBuilding }: Props) {
  const [buildings, setBuildings] = useState<Building[]>();



  const map = useMap();

  useMapEvents({
    click(e) {
      fetch(
        `https://localhost:7152/api/building/?lat=${e.latlng.lat}&lon=${e.latlng.lng}`
      )
        .then((response) => response.json())
        .then((response) => {
          // check ig the response is a building
          if (response.reference) {
            setBuildings([response]);

            if (onSelectBuilding) onSelectBuilding(response);
          } else {
            setBuildings([]);

            if (onSelectBuilding) onSelectBuilding(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return <></>;
}
