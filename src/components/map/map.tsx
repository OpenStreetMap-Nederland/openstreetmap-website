"use client";
import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapMenu } from "./map-menu";
import dynamic from "next/dynamic";
import { MapPostition } from "@/types/map-postition";

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
  mapPostion?: MapPostition;
  interactable?: boolean;
}

export function Map({ children, mapPostion, interactable = true }: Props) {
  return (
    <MapContainer
      className={"h-full z-0"}
      zoomControl={interactable ? true : false}
      scrollWheelZoom={interactable ? true : false}
      dragging={interactable ? true : false}
      maxZoom={19}
      center={mapPostion && [mapPostion.lat, mapPostion.lng]}
      zoom={mapPostion && mapPostion.zoom}
    >
      <MapMenu>
        <TileLayer
          maxZoom={19}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapMenu>
    </MapContainer>
  );
}
