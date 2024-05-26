"use client";
import dynamic from "next/dynamic";
import React from "react";

type Props = {
  location: number[];
  interactable?: boolean;
};

export function WindowContainer({ location, interactable = true }: Props) {
  const MapLocationContainer = dynamic(
    () =>
      import("./map-location-container").then((m) => m.MapLocationContainer),
    {
      ssr: false,
    }
  );

  return (
    <MapLocationContainer location={location} interactable={interactable} />
  );
}
