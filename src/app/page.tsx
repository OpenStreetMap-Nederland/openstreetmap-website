import { Metadata } from "next";
import { Map } from "@/components/map/map";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapContainer } from "@/components/map/containers/map-container";
import { SplitContainer } from "@/components/dynamic-layout/split-container";

export const metadata: Metadata = {
  title: "OpenStreetMap Nederland",
  description:
    "OpenStreetMap is een kaart van de wereld, gemaakt door mensen zoals jij en ik, gratis te gebruiken onder een open licentie.",
};

export default function HomePage() {
  return (
    <>
      <div className="h-0 z-10 relative">
        {/* <Input
          className="relative top-4 left-4 z-10 w-full"
          placeholder="Search..."
        ></Input> */}

        {/* <div className="">
          <div className="flex gap-2 p-3 justify-center">
            <Badge>Horica</Badge>
            <Badge>Winkels</Badge>
            <Badge>Amuzement</Badge>

          </div>
        </div> */}

        {/* <div className="flex gap-2 p-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Changeset 143745769</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div> */}
      </div>

      <MapContainer />

      {/* <iframe
        className="w-full h-full"
        src="https://overpass-api.de/achavi/?changeset=143777597"
      ></iframe> */}
      {/* <iframe
        className="w-full h-full"
        src="https://taginfo.openstreetmap.org/"
      ></iframe> */}
    </>
  );
}
