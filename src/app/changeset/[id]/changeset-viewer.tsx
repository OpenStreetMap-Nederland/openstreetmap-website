"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Polygon } from "react-leaflet";
import { Changeset } from "@/types/changset";
import Link from "next/link";
import { useMap } from "react-leaflet/hooks";
import { Title } from "@/components/layouts/title";
import dynamic from "next/dynamic";

type Props = {
  changeset: Changeset;
};

function MoveToCenterOfChangeset({ changeset }: Props) {
  const centerLat = (changeset.minlat + changeset.maxlat) / 2;
  const centerLon = (changeset.minlon + changeset.maxlon) / 2;

  const map = useMap();

  map.setView([centerLat, centerLon], 17);

  return null;
}

export default function ChangesetViewer({ changeset }: Props) {
  const [achavi, setAchavi] = useState(false);

  const Map = dynamic(
    () => import("./../../../components/map/map").then((m) => m.Map),
    {
      ssr: false,
    }
  );

  return (
    <div className="h-full w-full grid grid-cols-4">
      <div className="col-span-1 m-4">
        <div className="mb-4">
          <Title
            size="h1"
            title="Changeset"
            titlePostfix={`${changeset.id}`}
            actions={
              <div className="flex items-center gap-2">
                <Label htmlFor="enable-achavi">Achavi</Label>

                <Switch
                  id="enable-achavi"
                  checked={achavi}
                  onCheckedChange={() => setAchavi(!achavi)}
                />
              </div>
            }
          />
        </div>
        <div className="mb-4">
          <p>{changeset.tags.comment}</p>
        </div>
        <p>
          Closed {changeset.closed_at} by{" "}
          <Link href={`/mapper/${changeset.user}`}>{changeset.user}</Link>
        </p>
      </div>

      <div className="w-full h-full col-span-3">
        {achavi ? (
          <iframe
            className="w-full h-full"
            src={`https://overpass-api.de/achavi/?changeset=${changeset.id}`}
          ></iframe>
        ) : (
          <Map>
            <Polygon
              positions={[
                [changeset.minlat, changeset.minlon],
                [changeset.maxlat, changeset.minlon],
                [changeset.maxlat, changeset.maxlon],
                [changeset.minlat, changeset.maxlon],
              ]}
            />
            <MoveToCenterOfChangeset changeset={changeset} />
          </Map>
        )}
      </div>
    </div>
  );
}
