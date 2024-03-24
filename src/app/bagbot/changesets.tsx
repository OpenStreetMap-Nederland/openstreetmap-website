"use client";

import * as React from "react";
import { Column, ColumnDef, SortingState } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "../data-table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export type Changeset = {
  id: string;
  status: ChangesetStatus;
  osmId: number;
  createdAt: Date;
  closedAt: Date | null;
};

export enum ChangesetStatus {
  Open = 0,
  Closed = 1,
  Failed = 2,
  Uploaded = 3,
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

function sortHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export const columns: ColumnDef<Changeset>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) =>
      sortHeader({
        column,
        title: "Status",
      }),
    cell: ({ row }) => <span>{ChangesetStatus[row.original.status]}</span>,
  },
  {
    accessorKey: "osmId",
    header: ({ column }) =>
      sortHeader({
        column,
        title: "OSM ID",
      }),
    cell: ({ row }) => (
      <a
        href={`https://master.apis.dev.openstreetmap.org/changeset/${row.original.osmId}`}
        target="_blank"
        rel="noreferrer"
      >
        {row.original.osmId}
      </a>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) =>
      sortHeader({
        column,
        title: "Created At",
      }),
    cell: ({ row }) => (
      <span>{new Date(row.original.createdAt).toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "closedAt",
    header: ({ column }) =>
      sortHeader({
        column,
        title: "Closed At",
      }),
    cell: ({ row }) => (
      <span>
        {row.original.closedAt &&
          new Date(row.original.closedAt).toLocaleString()}
      </span>
    ),
  },
];

async function getData(sorting: SortingState): Promise<Changeset[]> {
  let sort = "";

  for (let i = 0; i < sorting.length; i++) {
    sort += `&sort[${i}].field=${sorting[i].id}&sort[${i}].order=${
      sorting[i].desc ? "desc" : "asc"
    }`;
  }

  const bagBotUrl = process.env.BAGBOT_URL || "https://localhost:7152";
  const data = await fetch(
    `${bagBotUrl}/api/changeset?page=1&pageSize=50${sort ? sort : ""}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data as Changeset[];
    });

  return data;
}

export default function Changesets() {
  const [changesets, setChangesets] = useState<Changeset[] | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    getData(sorting).then((data) => {
      setChangesets(data);
    });
  }, [sorting]);

  const onChange = (sorting: SortingState) => {
    setSorting(sorting);
  };

  return (
    <div className="grid gap-4">
      {changesets !== null && changesets.length > 0 ? (
        <DataTable columns={columns} data={changesets} onChange={onChange} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
