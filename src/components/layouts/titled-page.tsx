"use client";
import React from "react";
import { Separator } from "../ui/separator";
import { SeparatorTypes } from "@/enums/separator-types";
import { Title } from "./title";
import Link from "next/link";
import { ArrowLeft, MoveLeft } from "lucide-react";

interface TitledPageProps {
  title: string;
  titlePostfix?: string | null;
  subTitle?: string | null;
  separator?: SeparatorTypes;
  actions?: React.ReactNode | null;
  backLink?: string | null;
  children: React.ReactNode;
}

export function TitledPage({
  title,
  titlePostfix,
  subTitle,
  separator = SeparatorTypes.space,
  actions,
  backLink,
  children,
}: TitledPageProps) {
  return (
    <div className="flex-1 space-y-6 p-10 pb-16 container mx-auto">
      {backLink && (
        <Link
          href={backLink}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      )}
      <Title
        size="h1"
        title={title}
        titlePostfix={titlePostfix}
        subTitle={subTitle}
        actions={actions}
      />

      {separator === SeparatorTypes.space && <div className="h-1"></div>}
      {separator === SeparatorTypes.line && <Separator />}
      {children}
    </div>
  );
}
