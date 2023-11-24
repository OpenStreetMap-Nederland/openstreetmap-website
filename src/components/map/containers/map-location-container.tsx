"use client";
import dynamic from "next/dynamic";
import React from "react";
import { Marker, useMap } from "react-leaflet";
import { LatLngExpression, icon } from "leaflet";

type Props = {
  children?: React.ReactNode | React.ReactNode[] | null;
  location: number[];
};

const MoveToLocation = ({ location }: { location: LatLngExpression }) => {
  const map = useMap();
  map.setView(location, 16);

  return (
    <Marker
      icon={icon({
        iconUrl: "/location.svg",
        iconSize: [24, 24],
      })}
      position={location}
    />
  );
};

export function MapLocationContainer({ children, location }: Props) {
  const Map = dynamic(() => import("../map").then((m) => m.Map), {
    ssr: false,
  });

  const latLong: LatLngExpression = [location[1], location[0]];

  return (
    <Map>
      <MoveToLocation location={latLong} />
      <div suppressHydrationWarning>
        {typeof window === "undefined" ? null : children}
      </div>
    </Map>
  );
}
