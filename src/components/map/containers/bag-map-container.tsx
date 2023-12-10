"use client";
import dynamic from "next/dynamic";
import React, { memo, useCallback, useState } from "react";
import { MapUrl } from "../map-url";
import { Title } from "@/components/layouts/title";
import { Close } from "@radix-ui/react-toast";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MapPostition } from "@/types/map-postition";
import SelectBuilding from "../../bagbot/select-building";
import { set } from "date-fns";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  children?: React.ReactNode | React.ReactNode[] | null;
};

export function BagMapContainer({ children }: Props) {
  const { toast } = useToast();

  let Map = dynamic(() => import("../map").then((m) => m.Map), {
    ssr: false,
  });

  const SelectBuilding = dynamic(() => import("../../bagbot/select-building"), {
    ssr: false,
  });

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>();

  const onSelectBuilding = useCallback((building: Building | null) => {
    setSelectedBuilding(building);
  }, []);

  const importBuilding = () => {
    if (!selectedBuilding) return;

    fetch(
      `https://localhost:7152/api/task/importbuilding/${selectedBuilding?.reference}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        toast({
          title: "Building imported",
          description: `Building ${selectedBuilding.reference} imported`,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Building import failed",
          description: `Building ${selectedBuilding.reference} import failed`,
        });
      });
  };

  const updateBuilding = () => {
    if (!selectedBuilding) return;

    fetch(
      `https://localhost:7152/api/task/updatebuilding/${selectedBuilding?.reference}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        toast({
          title: "Building updated",
          description: `Building ${selectedBuilding.reference} updated`,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Building update failed",
          description: `Building ${selectedBuilding.reference} update failed`,
        });
      });
  };

  return (
    <div className="h-[550px] w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-1 rounded-lg overflow-hidden">
        <MapMemo onSelectBuilding={onSelectBuilding}></MapMemo>
      </div>
      {selectedBuilding && (
        <Card className="col-span-1 z-10 rounded-lg bg-white dark:bg-gray-900 p-4 flex flex-col justify-between">
          <div>
            <Title size="h1" title="Bag" titlePostfix="Building" />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>{selectedBuilding.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Complex</TableCell>
                  <TableCell>
                    {selectedBuilding.complexId ?? "No complex calculations"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Reference</TableCell>
                  <TableCell>{selectedBuilding.reference}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{selectedBuilding.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>{selectedBuilding.startDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Source Date</TableCell>
                  <TableCell>{selectedBuilding.sourceDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hash</TableCell>
                  <TableCell>{selectedBuilding.hash}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end gap-4">
            <Button onClick={importBuilding}>import</Button>
            <Button onClick={updateBuilding}>update</Button>
          </div>
        </Card>
      )}
    </div>
  );
}

const MapMemo = memo(function MapMemoTest({
  onSelectBuilding,
}: {
  onSelectBuilding: (building: Building | null) => void;
}) {
  let Map = dynamic(() => import("../map").then((m) => m.Map), {
    ssr: false,
  });
  return (
    <Map
    // mapPostion={
    //   {
    //     lat: 52.370216,
    //     lng: 4.895168,
    //     zoom: 12,
    //   } as MapPostition
    // }
    >
      <MapUrl />

      <SelectBuilding onSelectBuilding={onSelectBuilding} />
    </Map>
  );
});
