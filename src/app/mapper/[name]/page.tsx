import React, { Suspense } from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { User, UserData } from "@/types/user";
import { SeparatorTypes } from "@/enums/separator-types";
import Markdown from "react-markdown";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { ExternalButton } from "@/components/external-button";
import { generateImageLink, toInternalLinks } from "@/lib/utils";
import { env } from "process";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import { MarkdownWrapper } from "@/components/markdown-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { UserDescription } from "@/components/user-description";

export default async function AboutPage({
  params,
}: {
  params: { name: string };
}) {
  return (
    <TitledPage title={"user"} separator={SeparatorTypes.space}>
      <Separator />

      <Suspense fallback={<Skeleton />}>
        <UserDescription params={params} />
      </Suspense>
    </TitledPage>
  );
}
