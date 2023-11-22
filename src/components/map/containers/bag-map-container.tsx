"use client";
import dynamic from "next/dynamic";
import React from "react";

type Props = {
  children?: React.ReactNode | React.ReactNode[] | null;
};

export function BagMapContainer({ children }: Props) {
  const Map = dynamic(() => import("../map").then((m) => m.Map), {
    ssr: false,
  });

  const SelectBuilding = dynamic(() => import("../../bagbot/select-building"), {
    ssr: false,
  });

  return (
    <Map>
      <SelectBuilding onBuildingChange={() => {}} />
      <div suppressHydrationWarning>
        {typeof window === "undefined" ? null : children}
      </div>
    </Map>
  );
}
