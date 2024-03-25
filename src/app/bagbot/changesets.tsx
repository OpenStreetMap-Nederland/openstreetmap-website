"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import Link from "next/link";

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

async function getData(lazyState: {
  first: number;
  rows: number;
  sortField: string | undefined;
  sortOrder: null;
}): Promise<Changeset[]> {
  let sort = "";

  lazyState.sortField &&
    (sort += `&sort[0].field=${lazyState.sortField}&sort[0].order=${
      lazyState.sortOrder === 1 ? "asc" : "desc"
    }`);

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const page = lazyState.first / lazyState.rows + 1;
  const data = await fetch(
    `${baseUrl}/api/bagbot/changeset?page=${page}&pageSize=${lazyState.rows}${
      sort ? sort : ""
    }`,
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
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(10);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    sortField: "",
    sortOrder: null,
  });
  const [changesets, setChangesets] = useState<Changeset[] | null>(null);

  useEffect(() => {
    setLoading(true);
    getData(lazyState).then((data) => {
      setChangesets(data);
      setLoading(false);
    });
  }, [lazyState]);

  const onPage = (event: any) => {
    setlazyState(event);
  };

  const onSort = (event: any) => {
    setlazyState(event);
  };

  const statusBodyTemplate = (changeset: Changeset) => {
    return (
      <Tag
        value={ChangesetStatus[changeset.status]}
        severity={getSeverity(changeset)}
      ></Tag>
    );
  };

  const getSeverity = (changeset: Changeset) => {
    switch (changeset.status) {
      case ChangesetStatus.Open:
        return "warning";
      case ChangesetStatus.Closed:
        return "info";
      case ChangesetStatus.Failed:
        return "danger";
      case ChangesetStatus.Uploaded:
        return "success";
    }
  };

  const osmIdBodyTemplate = (changeset: Changeset) => {
    return (
      <Link
        href={`https://master.apis.dev.openstreetmap.org/changeset/${changeset.osmId}`}
        target="_blank"
        rel="noreferrer"
      >
        {changeset.osmId}
      </Link>
    );
  };

  const dateBodyTemplate = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toLocaleString();
  };

  return (
    <div className="grid gap-4">
      {changesets !== null && changesets.length > 0 ? (
        <DataTable
          value={changesets}
          lazy
          dataKey="id"
          paginator
          first={lazyState.first}
          rows={lazyState.rows}
          totalRecords={totalRecords}
          onPage={onPage}
          onSort={onSort}
          sortField={lazyState.sortField}
          sortOrder={lazyState.sortOrder}
          // loading={loading}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            header="Status"
            field="status"
            sortable
            body={statusBodyTemplate}
          ></Column>
          <Column
            header="OSM id"
            field="osmId"
            sortable
            body={osmIdBodyTemplate}
          ></Column>
          <Column
            header="Created at"
            field="createdAt"
            sortable
            body={(c) => dateBodyTemplate(c.createdAt)}
          ></Column>
          <Column
            header="Closed at"
            field="closedAt"
            sortable
            body={(c) => dateBodyTemplate(c.closedAt)}
          ></Column>
        </DataTable>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
