import { parse } from "path";
import { useState, useMemo } from "react";
import { useMapEvents, Polygon, useMap } from "react-leaflet";

type Props = {
  onSelectBuilding?: (building: Building | null) => void;
};

export default function SelectBuilding({ onSelectBuilding }: Props) {
  const [selectedBuilding, setSelectedBuilding] = useState<Building>();
  const [buildings, setBuildings] = useState<Building[]>();

  const buildingPolygons = useMemo(() => {
    if (buildings) {
      return buildings.map((building) => {
        return building.polygon;
      });
    }
  }, [buildings]);

  // const getBuildingByReference = (reference: string) => {
  //   fetch(`https://localhost:7152/api/building/?referance=${reference}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setBuildings([response]);

  //       if (onSelectBuilding) onSelectBuilding(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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

  return buildingPolygons
    ? buildingPolygons.map((buildingPolygon, i) => {
        if (buildingPolygon?.coordinates?.length > 1) {
          return (
            <Polygon
              key={i}
              pathOptions={{ color: "red" }}
              positions={buildingPolygon.coordinates}
            />
          );
        }
      })
    : null;
}
