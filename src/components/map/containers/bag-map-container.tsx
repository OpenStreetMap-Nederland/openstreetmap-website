"use client";
import dynamic from "next/dynamic";
import React, { memo, useCallback, useMemo, useState } from "react";
import { MapUrl } from "../map-url";
import { Title } from "@/components/layouts/title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SelectBuilding from "../../bagbot/select-building";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RenderBuilding from "@/components/bagbot/render-building";
import { env } from "process";
import { Map } from "@/components/map/map";

type Props = {
  children?: React.ReactNode | React.ReactNode[] | null;
};

export function BagMapContainer({ children }: Props) {
  const { toast } = useToast();

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>();

  const onSelectBuilding = useCallback((building: Building | null) => {
    setSelectedBuilding(building);
  }, []);

  const importBuilding = () => {
    if (!selectedBuilding) return;

    const bagBotUrl = process.env.BAGBOT_URL || "https://localhost:7152";
    fetch(
      `${bagBotUrl}/api/task/importbuilding/${selectedBuilding?.reference}`,
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

    const bagBotUrl = process.env.BAGBOT_URL || "https://localhost:7152";
    fetch(
      `${bagBotUrl}/api/task/updatebuilding/${selectedBuilding?.reference}`,
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

  const formSchema = z.object({
    reference: z.string().min(16, {
      message: "Reference must be at least 16 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reference: "",
    },
  });

  const searchBuilding = (values: z.infer<typeof formSchema>) => {
    const bagBotUrl = process.env.BAGBOT_URL || "https://localhost:7152";
    fetch(`${bagBotUrl}/api/building/?referance=${values.reference}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setSelectedBuilding(response);

        if (onSelectBuilding) onSelectBuilding(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-[550px] w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-1 rounded-lg overflow-hidden">
        <Map>
          <MapUrl />
          <RenderBuilding selectedBuilding={selectedBuilding} />
          <SelectBuilding onSelectBuilding={onSelectBuilding} />
        </Map>
      </div>
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(searchBuilding)}
            className="space-y-8 flex gap-4 w-full"
          >
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Reference</FormLabel>
                  <FormControl>
                    <Input placeholder="reference" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Search</Button>
          </form>
        </Form>

        {selectedBuilding && (
          <Card className="col-span-1 z-10 rounded-lg bg-white dark:bg-gray-900 p-4 flex flex-col justify-between">
            <div>
              <Title size="h1" title="Bag" titlePostfix="Building" />
              <Table className="my-4">
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
                    <TableCell>Reference</TableCell>
                    <TableCell>{selectedBuilding.reference}</TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>{selectedBuilding.type}</TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell>Start Date</TableCell>
                    <TableCell>{selectedBuilding.startDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Source Date</TableCell>
                    <TableCell>{selectedBuilding.sourceDate}</TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell>Hash</TableCell>
                    <TableCell>{selectedBuilding.hash}</TableCell>
                  </TableRow> */}
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
    </div>
  );
}

const MapMemo = memo(function MapMemo({
  onSelectBuilding,
  selectedBuilding,
}: {
  onSelectBuilding: (building: Building | null) => void;
  selectedBuilding: Building | null | undefined;
}) {
  let Map = dynamic(() => import("../map").then((m) => m.Map), {
    ssr: false,
  });

  return (
    <Map>
      <MapUrl />
      <RenderBuilding selectedBuilding={selectedBuilding} />
      <SelectBuilding onSelectBuilding={onSelectBuilding} />
    </Map>
  );
});
