"use client";
import dynamic from "next/dynamic";
import React from "react";
import { MapUrl } from "../map-url";

type Props = {
  children?: React.ReactNode | React.ReactNode[] | null;
};

export function MapContainer({ children }: Props) {
  const Map = dynamic(() => import("../map").then((m) => m.Map), {
    ssr: false,
  });

  return (
    <Map>
      {/* <MapNotes /> */}
      <MapUrl />
      <div suppressHydrationWarning>
        {typeof window === "undefined" ? null : children}
      </div>
    </Map>
  );
}
