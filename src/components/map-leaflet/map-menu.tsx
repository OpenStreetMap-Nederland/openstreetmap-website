"use client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import { LatLng } from "leaflet";

type Props = {
  children: React.ReactNode;
};

export function MapMenu({ children }: Props) {
  const { toast } = useToast();
  const [copy, setCopy] = useState(false);
  const [location, setLocation] = useState<LatLng>();

  const copyLocation = () => {
    if (!location) return;
    setCopy(true);
    navigator.clipboard.writeText(
      location.lat.toFixed(5) + ", " + location.lng.toFixed(5)
    );

    toast({
      title: "Locatie gekopieerd",
      description: "De locatie is gekopieerd naar het klembord.",
    });
  };

  const map = useMap();

  useMapEvents({
    mousedown(e) {
      setLocation(e.latlng);
    },
  });

  const centerMap = () => {
    map.flyTo(location!, 16, { duration: 1 });
  };

  return (
    <ContextMenu
      onOpenChange={(e) => {
        if (e === false) return;
        setCopy(false);
      }}
    >
      <ContextMenuTrigger className="flex h-full w-full">
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={copyLocation}>
          {location
            ? location.lat.toFixed(5) + ", " + location.lng.toFixed(5)
            : "No location"}
          <ContextMenuShortcut>
            {copy ? (
              <Check className="h-4 w-4"></Check>
            ) : (
              <Copy className="h-4 w-4"></Copy>
            )}
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={centerMap}>Kaart centreren</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
