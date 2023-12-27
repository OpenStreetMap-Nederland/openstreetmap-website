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

// export async function generateMetadata({
//   params,
// }: {
//   params: {
//     name: string;
//     id: string;
//   };
// }): Promise<Metadata> {
//   const diary: Diary | null = await getDiary(params.name, params.id);
//   if (!diary) return notFound();

//   return {
//     title: eclipse(diary.title, 50) + " OpenStreetMap diary",
//     description: eclipse(richTextToPlainText(diary.content), 200),
//     openGraph: {
//       type: "article",
//       // images: [],
//     },
//   };
// }

type Props = {
  params: Params;
};

type Params = {
  country: string;
};

export default async function CountryPage({ params }: Props) {
  if (params.country !== "nederland") {
    return notFound();
  }

  const baseUrl = env.BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/places/${params.country}`, {
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

  const data = await response.json();

  return (
    <TitledPage
      title={params.country.capitalize()}
      separator={SeparatorTypes.none}
    >
      <div>
        {data.map((province: string) => (
          <div key={province}>
            <Link href={`/places/${params.country}/${province}`}>
              {province.capitalize()}
            </Link>
          </div>
        ))}
      </div>
    </TitledPage>
  );
}
