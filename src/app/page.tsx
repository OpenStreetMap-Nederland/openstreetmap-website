import { Metadata } from "next";
import { MapContainer } from "@/components/map/containers/map-container";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "OpenStreetMap Nederland",
  description:
    "OpenStreetMap is een kaart van de wereld, gemaakt door mensen zoals jij en ik, gratis te gebruiken onder een open licentie.",
};

export default function HomePage() {
  const headersList = headers();

  return (
    <div className="h-full w-full grid grid-cols-4">
      <MapContainer />
    </div>
  );
}
