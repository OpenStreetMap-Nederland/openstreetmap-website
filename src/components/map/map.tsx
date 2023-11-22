"use client";
import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapMenu } from "./map-menu";
import dynamic from "next/dynamic";
import { MapUrl } from "./map-url";
import { MapNotes } from "./map-notes";
import SelectBuilding from "../bagbot/select-building";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);

export const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
interface Props {
  children?: React.ReactNode | null;
}

export function Map({ children }: Props) {
  const [geoData, setGeoData] = useState({ lat: 52.1992, lng: 5.6799 });
  const [zoom, setZoom] = useState(8);

  return (
    <MapContainer
      className={"h-full z-0"}
      zoomControl={false}
      center={[geoData.lat, geoData.lng]}
      zoom={zoom}
      scrollWheelZoom={true}
      maxZoom={19}
    >
      <MapMenu>
        <TileLayer
          maxZoom={19}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapMenu>
      <MapNotes />
      <MapUrl />

      {children}
    </MapContainer>
  );
}
