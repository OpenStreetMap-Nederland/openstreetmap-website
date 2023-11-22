"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useToast } from "../ui/use-toast";
import { MapPostition } from "@/types/map-postition";

export function EditButton() {
  const { toast } = useToast();
  const [remoteControlLoaded, setRemoteControlLoaded] = useState(false);

  const editors = [
    {
      value: "id",
      label: "ID",
      disabled: true,
      badge: "Coming soon™",
    },
    {
      value: "josm",
      label: "JOSM",
      disabled: !remoteControlLoaded,
      badge: !remoteControlLoaded ? "Not running" : undefined,
      onclick: () => openRemote(),
    },
    // {
    //   value: "fluxmark",
    //   label: "FluxMark",
    //   disabled: true,
    //   badge: "Coming soon™",
    // },
  ];

  const readMapPositionFromLocalStorage = () => {
    const mapPostionString: string | null =
      localStorage.getItem("mapPostition");

    if (!mapPostionString) {
      return null;
    }

    const mapPostition: MapPostition = JSON.parse(mapPostionString);

    return mapPostition;
  };

  const openRemote = () => {
    const mapPostition: MapPostition | null = readMapPositionFromLocalStorage();
    if (!mapPostition) return;

    const lat = mapPostition.lat;
    const lng = mapPostition.lng;

    let size = Math.pow(2, 8 - mapPostition.zoom);
    if (size > 0.001) size = 0.001;

    const bbox = [lng - size, lng + size, lat + size, lat - size].map((n) =>
      n.toFixed(5)
    );

    fetch(
      `http://127.0.0.1:8111/load_and_zoom?left=${bbox[0]}&right=${bbox[1]}&top=${bbox[2]}&bottom=${bbox[3]}`
    )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (response.status === 200) {
          toast({
            title: "Success",
            description: "Opened remote control",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Open remote control failed",
        });
      });
  };

  const checkRemoteControl = () => {
    fetch("http://127.0.0.1:8111/version")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setRemoteControlLoaded(true);
        return response.json();
      })
      .catch(() => {
        setRemoteControlLoaded(false);
      });
  };

  return (
    <DropdownMenu
      onOpenChange={(value) => {
        if (value) checkRemoteControl();
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Edit
          <ChevronDown size={16} className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {editors.map((editor) => (
          <DropdownMenuItem
            disabled={editor?.disabled}
            key={editor.value}
            onClick={() => {
              editor.onclick?.();
            }}
            className="flex items-center justify-between"
          >
            <span>{editor.label}</span>
            {editor.badge && (
              <span className="text-xs rounded">{editor.badge}</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
