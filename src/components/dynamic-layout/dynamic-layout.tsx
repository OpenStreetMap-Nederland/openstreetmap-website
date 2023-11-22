"use client";
import { type } from "os";
import React, { useEffect, useState } from "react";

type SplitContainerProps = {
  children: React.ReactNode;
};

export function DynamicLayout({ children }: SplitContainerProps) {
  return <div className="flex flex-row h-full w-fullm p-1">{children}</div>;
}
