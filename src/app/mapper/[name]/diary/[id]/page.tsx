import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { SeparatorTypes } from "@/enums/separator-types";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { env } from "process";
import { Diary } from "@/types/diary";
import { eclipse, richTextToPlainText, toInternalLinks } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";
import { sanitize } from "isomorphic-dompurify";

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

  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        return (
          <Image
            src={domNode.attribs.src}
            width={800}
            height={600}
            alt={domNode.attribs.alt}
            className="rounded-lg w-full md:w-2/3 lg:w-1/2 mt-4 mb-2"
            priority
            unoptimized
          ></Image>
        );
      }

      if (domNode.name === "code") {
        return (
          <span className="bg-gray-100 dark:bg-gray-800 rounded-md px-1.5 py-0.5 hover:underline">
            {domNode.children[0].data}
          </span>
        );
      }

      if (domNode.name === "a") {
        let baseUrl = env.BASE_URL || "http://localhost:3000";
        let href = domNode.attribs.href;

        if (href && !href.startsWith("http")) {
          domNode.attribs.rel = null;
          return <Link {...domNode.attribs}>{domNode.children[0].data}</Link>;
        } else {
          domNode.attribs.target = "_blank";
        }
      }
    },
  };

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
      {diary.content && (
        <article
          className="flex flex-col gap-4 prose dark:prose-invert"
          lang={diary.language}
        >
          {parse(sanitize(diary.content), options)}
        </article>
      )}
    </TitledPage>
  );
}
