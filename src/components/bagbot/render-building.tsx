import { useEffect } from "react";
import { Polygon } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";

type Props = {
  selectedBuilding: Building | null | undefined;
};

export default function RenderBuilding({ selectedBuilding }: Props) {
  const map = useMap();

  useEffect(() => {
    if (
      selectedBuilding != undefined &&
      selectedBuilding?.polygon?.coordinates?.length > 1
    ) {
      let coordinates = selectedBuilding?.polygon?.coordinates[0][0];

      let lng = 0;
      let lat = 0;

      for (let i = 0; i < coordinates.length; i++) {
        lng += coordinates[i][0];
        lat += coordinates[i][1];
      }

      let coord = [lng / coordinates.length, lat / coordinates.length];

      map.flyTo([coord[0], coord[1]], 19);
    }
  }, [selectedBuilding, map]);

  return selectedBuilding != undefined &&
    selectedBuilding?.polygon?.coordinates?.length > 1 ? (
    <Polygon
      key={selectedBuilding?.id}
      pathOptions={{ color: "red" }}
      positions={selectedBuilding?.polygon?.coordinates}
    />
  ) : null;
}
