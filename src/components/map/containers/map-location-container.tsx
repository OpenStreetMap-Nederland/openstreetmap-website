"use client";
import dynamic from "next/dynamic";
import React from "react";
import { Marker, useMap } from "react-leaflet";
import { LatLngExpression, icon } from "leaflet";

type Props = {
  location: number[];
  interactable?: boolean;
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

export function MapLocationContainer({ location, interactable }: Props) {
  const Map = dynamic(() => import("../map").then((m) => m.Map), {
    ssr: false,
  });

  const latLong: LatLngExpression = [location[1], location[0]];

  return (
    <Map interactable={interactable}>
      <MoveToLocation location={latLong} />
    </Map>
  );
}
