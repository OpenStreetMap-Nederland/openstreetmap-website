"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  children: React.ReactNode;
};

export function DynamicPage({ children }: Props) {
  return (
    <div className="flex flex-col border h-full rounded-md">
      <div className="border-b">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select map" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Maps</SelectLabel>
              <SelectItem value="carto">Carto</SelectItem>
              <SelectItem value="mapbox">Mapbox</SelectItem>
              <SelectItem value="google">Google</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {children}
    </div>
  );
}
