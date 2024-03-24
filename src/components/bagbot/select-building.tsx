import { useMapEvents } from "react-leaflet";

type Props = {
  onSelectBuilding?: (building: Building | null) => void;
};

export default function SelectBuilding({ onSelectBuilding }: Props) {
  useMapEvents({
    click(e) {
      const baseUrl = process.env.BASE_URL || "http://localhost:3000";
      fetch(
        `${baseUrl}/api/bagbot/building/?lat=${e.latlng.lat}&lon=${e.latlng.lng}`
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.reference) {
            if (onSelectBuilding) onSelectBuilding(response);
          } else {
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
