"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

type Props = {
  children?: React.ReactNode | React.ReactNode[] | null;
};

export function MapContainer({ children }: Props) {
  const Map = dynamic(() => import("./map").then((m) => m.Map), {
    ssr: false,
  });

  const SelectBuilding = dynamic(
    () => import("../../components/bagbot/select-building"),
    {
      ssr: false,
    }
  );

  return (
    <Map>
      <SelectBuilding onBuildingChange={() => {}} />
      <div suppressHydrationWarning>
        {typeof window === "undefined" ? null : children}
      </div>
    </Map>
  );
}
