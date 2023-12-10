"use client";
import dynamic from "next/dynamic";
import React, { use, useContext, useEffect } from "react";
import { MapUrl } from "../map-url";
import { Title } from "@/components/layouts/title";

type Props = {
  children?: React.ReactNode | React.ReactNode[] | null;
};

export function MapContainer({ children }: Props) {
  const Map = dynamic(() => import("../map").then((m) => m.Map), {
    ssr: false,
  });

  return (
    <div className="w-full h-full col-span-4">
      {/* <div className="w-1/4 m-4 absolute z-10 rounded-lg bg-white dark:bg-gray-900">
        <div className="m-4">
          <Title size="h1" title="History" titlePostfix="Changesets" />
          <div className="mb-4">Work in progress</div>
        </div>
      </div> */}

      <Map>
        {/* <MapNotes /> */}
        <MapUrl />
        <div suppressHydrationWarning>
          {typeof window === "undefined" ? null : children}
        </div>
      </Map>
    </div>
  );
}
