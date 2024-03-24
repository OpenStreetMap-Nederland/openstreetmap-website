import { env } from "process";
import { useMapEvents } from "react-leaflet";

type Props = {
  onSelectBuilding?: (building: Building | null) => void;
};

export default function SelectBuilding({ onSelectBuilding }: Props) {
  useMapEvents({
    click(e) {
      
      const bagBotUrl = env.BAGBOT_URL || "https://localhost:7152";
      fetch(
        `${bagBotUrl}/api/building/?lat=${e.latlng.lat}&lon=${e.latlng.lng}`
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
