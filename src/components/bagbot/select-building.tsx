import { useState, useMemo } from "react";
import { useMapEvents, Polygon } from "react-leaflet";

export default function SelectBuilding({
  onBuildingChange,
}: {
  onBuildingChange: (building: Building) => void;
}) {
  const [selectedBuilding, setSelectedBuilding] = useState<Building>();
  const [buildings, setBuildings] = useState<Building[]>();

  const buildingPolygons = useMemo(() => {
    if (buildings) {
      return buildings.map((building) => {
        return building.polygon;
      });
    }
  }, [buildings]);

  const getBuildingByReference = (reference: string) => {
    fetch(`https://localhost:7152/api/building/?referance=${reference}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setBuildings([response]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const map = useMapEvents({
    click(e) {
      fetch(
        `https://localhost:7152/api/building/?lat=${e.latlng.lat}&lon=${e.latlng.lng}`
      )
        .then((response) => response.json())
        .then((response) => {
          setBuildings([response]);
          onBuildingChange(response);
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
