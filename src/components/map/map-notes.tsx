"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { icon } from "leaflet";
import { LocateIcon } from "lucide-react";
import { Input } from "postcss";
import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import { Marker } from "react-leaflet/Marker";
import { Label } from "recharts";
import { Button } from "../ui/button";

export function MapNotes() {
  const [notes, setNotes] = useState([]);

  const getNotes = async (bbox: any[]) => {
    const response = await fetch(
      `https://api.openstreetmap.org/api/0.6/notes.json?bbox=${bbox.join(
        ","
      )}&limit=100`
    );
    const data = await response.json();

    // remove notes that are outside of bbox
    const newNotes: any = notes.filter((note: any) => {
      const lat = note.geometry.coordinates[1];
      const lng = note.geometry.coordinates[0];
      return (
        lat >= bbox[1] && lat <= bbox[3] && lng >= bbox[0] && lng <= bbox[2]
      );
    });

    // add new notes
    data.features.forEach((note: any) => {
      if (!newNotes.find((n: any) => n.properties.id === note.properties.id)) {
        newNotes.push(note);
      }
    });

    setNotes(newNotes);
  };

  const eventToBbox = (e: any) => {
    const bbox = e.target.getBounds().toBBoxString().split(",");
    //if zoom is 8 or less clear notes
    if (e.target.getZoom() <= 8) {
      setNotes([]);
    } else {
      getNotes(bbox);
    }
  };

  useMapEvents({
    moveend(e) {
      eventToBbox(e);
    },
    zoomend(e) {
      eventToBbox(e);
    },
  });

  return notes.map((note: any) => (
    <Marker
      key={note.properties.id}
      position={[note.geometry.coordinates[1], note.geometry.coordinates[0]]}
      icon={icon({
        iconUrl: "/location.svg",
        iconSize: [24, 24],
      })}
      eventHandlers={
        {
          click: (e: any) => {
            console.log(note);
          },
        } as any
      }
    ></Marker>
  ));
}
