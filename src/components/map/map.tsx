"use client";
import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapMenu } from "./map-menu";
import dynamic from "next/dynamic";
import { MapUrl } from "./map-url";
import { MapNotes } from "./map-notes";
import SelectBuilding from "../bagbot/select-building";
import { LayersControl } from "react-leaflet/LayersControl";
import { Circle, LayerGroup } from "react-leaflet";

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
      <TileLayer
        maxZoom={19}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OSM carto">
          <TileLayer
            maxZoom={19}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Pdok luchtfoto">
          <TileLayer
            maxZoom={19}
            attribution='&copy; <a href="https://www.pdok.nl/">PDOK</a> contributors'
            url="https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_orthoHR/EPSG:3857/{z}/{x}/{y}.jpeg"
          />
        </LayersControl.BaseLayer>
      </LayersControl> */}
      {children}
    </MapContainer>
  );
}
