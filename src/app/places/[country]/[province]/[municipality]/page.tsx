import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { SeparatorTypes } from "@/enums/separator-types";
import { notFound } from "next/navigation";
import { env } from "process";
import Link from "next/link";

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
  province: string;
  municipality: string;
};

export default async function CountryPage({ params }: Props) {
  if (params.country !== "nederland") {
    return notFound();
  }

  const baseUrl = env.BASE_URL || "http://localhost:3000";
  const response = await fetch(
    `${baseUrl}/api/places/${params.country}/${params.province}/${params.municipality}`,
    {
      next: {
        revalidate: false,
      },
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );

  if (response.status !== 200) {
    return notFound();
  }

  const data = await response.json();

  return (
    <TitledPage
      title={params.municipality.capitalize()}
      titlePostfix={params.province.capitalize()}
      separator={SeparatorTypes.none}
      backLink={`/places/${params.country}/${params.province}`}
    >
      <div>
        {data.map((place: string) => (
          <div key={place}>
            <Link
              href={`/places/${params.country}/${params.province}/${params.municipality}/${place}`}
            >
              {place.capitalize()}
            </Link>
          </div>
        ))}
      </div>
    </TitledPage>
  );
}
