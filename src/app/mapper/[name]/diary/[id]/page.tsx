import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { SeparatorTypes } from "@/enums/separator-types";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { env } from "process";
import { Diary } from "@/types/diary";
import { eclipse, richTextToPlainText, toInternalLinks } from "@/lib/utils";
import Link from "next/link";
import { RichtextWrapper } from "@/components/richtext-wrapper";

export async function generateMetadata({
  params,
}: {
  params: {
    name: string;
    id: string;
  };
}): Promise<Metadata> {
  const diary: Diary | null = await getDiary(params.name, params.id);
  if (!diary) return notFound();

  return {
    title: eclipse(diary.title, 50) + " OpenStreetMap diary",
    description: eclipse(richTextToPlainText(diary.content), 200),
    openGraph: {
      type: "article",
      // images: [],
    },
  };
}

const getDiary = async (name: string, id: string) => {
  if (!name) return null;

  const baseUrl = env.BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/mapper/${name}/diary/${id}`, {
    next: {
      revalidate: false,
    },
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  if (response.status !== 200) {
    return notFound();
  }

  const diary: Diary = await response.json();

  return diary;
};

export default async function AboutPage({
  params,
}: {
  params: { name: string; id: string };
}) {
  const diary = await getDiary(params.name, params.id);
  if (!diary) return notFound();

  return (
    <TitledPage
      title={diary.title}
      subTitle={
        <>
          Posted by{" "}
          <Link href={`/mapper/${diary.creator}`}>{diary.creator}</Link> on{" "}
          {new Date(diary.date).toLocaleDateString()}
        </>
      }
      separator={SeparatorTypes.space}
    >
      {diary.content && <RichtextWrapper>{diary.content}</RichtextWrapper>}
    </TitledPage>
  );
}
