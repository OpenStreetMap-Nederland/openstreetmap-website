/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import PointMapStyle from "./PointMapStyle";
import {
  writeEventMapPositionToUrl,
  MapPostition,
  readMapPositionFromUrl,
  moveMapToPosition,
  readMapPositionFromLocalStorage,
  writeMapPositionToUrl,
} from "./map-postition";
import Link from "next/link";

let load = false;

export function Map() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [selectedPoi, setSelectedPoi] = useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    if (pathname === "/") setSelectedPoi(null);
  }, [pathname]);

  const createMap = () => {
    const htmlElement: HTMLElement | null = mapContainer.current;
    if (!htmlElement) return;

    if (mapContainer.current === null) return;

    // let protocol = new pmtiles.Protocol();
    // maplibregl.addProtocol("pmtiles", protocol.tile);
    // let url = process.env.PMTILES_URL;
    // if (!url) {
    //   throw new Error("PMTILES_URL is not set");
    // }
    // const p = new pmtiles.PMTiles(url);
    // protocol.add(p);
    // p.getHeader().then((h) => {
    // });

    const map = new maplibregl.Map({
      container: htmlElement,
      style: PointMapStyle,
    });

    setMap(map);

    map.on("mouseenter", "poi", (e) => {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to the default cursor when it leaves the points layer.
    map.on("mouseleave", "poi", () => {
      map.getCanvas().style.cursor = "";
    });

    map.on("click", (e) => {
      let target = e.originalEvent.target as HTMLElement;

      if (target.tagName.toLowerCase() !== "canvas") return;

      setSelectedPoi(null);
      router.push("/");
    });

    map.on("click", "poi", (e) => {
      let poi = e.features?.[0];
      if (!poi) return;

      console.log("POI clicked", poi);

      setSelectedPoi(poi.properties?.name || null);

      if (!poi.properties?.breadcrumb) {
        console.log(poi);
        router.push(`/poi/${poi.id}`);
      } else {
        router.push(`/poi/${poi.properties?.breadcrumb}`);
      }
    });

    map.on("load", () => {
      map.on("moveend", (e) => writeEventMapPositionToUrl(map));
      window.addEventListener("hashchange", () => {
        let urlMapPostition: MapPostition | null = readMapPositionFromUrl();
        if (!urlMapPostition) return;
        moveMapToPosition(map, urlMapPostition);
      });

      // first try to read from the url
      let mapPostition: MapPostition | null = readMapPositionFromUrl();

      // if not found, try to read from localstorage
      if (!mapPostition) mapPostition = readMapPositionFromLocalStorage();

      // backup position
      if (!mapPostition) {
        mapPostition = {
          lat: 52.1326,
          lng: 5.2913,
          zoom: 7,
        };
      }

      if (!mapPostition) throw new Error("No map position found");

      moveMapToPosition(map, mapPostition);
      writeMapPositionToUrl(mapPostition);

      setLoading(false);
    });
  };

  const clearMap = () => {
    if (!map) return;

    map.remove();
    setMap(null);
  };

  const reloadMap = () => {
    clearMap();
    createMap();
  };

  useEffect(() => {
    if (load) return;
    load = true;

    reloadMap();

    console.log("Map loaded");
  }, [mapContainer]);

  const [dots, setDots] = useState(1);

  useEffect(() => {
    if (!loading) return;

    let maxDots = 4;
    const interval = setInterval(() => {
      let newDots = dots + 1;
      if (newDots > maxDots) newDots = 1;
      setDots(newDots);
    }, 200);

    return () => clearInterval(interval);
  }, [loading, dots]);

  let show = false;
  if (pathname === "/") show = true;
  if (pathname === "/test") show = true;

  return (
    <div className={`map-wrap h-screen w-full ${show ? "block" : "hidden"}`}>
      <div ref={mapContainer} className="map">
        {!loading && (
          <Link href="https://www.openstreetmap.org/copyright" target="_blank">
            <div className="right-0 bottom-0 absolute z-10 m-3 p-1 px-3 rounded-full bg-gradient-to-r from-green-500 to-orange-500">
              <span className="text-md text-white font-bold select-none">
                Mogelijk gemaakt door OpenStreetMap data
              </span>
            </div>
          </Link>
        )}
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="flex gap-8 justify-between items-center">
            <Image
              className="w-[60px] h-[60px] dark:hidden animate-spin"
              alt="OpenStreetMap logo"
              width="60"
              height="60"
              src="/OSMNL_Square.svg"
              priority={true}
            ></Image>
            <span className="text-white text-3xl font-bold">Loading</span>
          </div>

          <span className="text-white text-3xl font-bold w-0">
            {".".repeat(dots)}
          </span>
        </div>
      )}
    </div>
  );
}
