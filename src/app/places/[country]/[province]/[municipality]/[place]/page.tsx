import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { SeparatorTypes } from "@/enums/separator-types";
import { notFound } from "next/navigation";
import { env } from "process";
import Link from "next/link";

type Props = {
  params: Params;
};

type Params = {
  country: string;
  province: string;
  municipality: string;
  place: string;
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default async function CountryPage({ params }: Props) {
  if (params.country !== "nederland") {
    return notFound();
  }

  const baseUrl = env.BASE_URL || "http://localhost:3000";
  const response = await fetch(
    `${baseUrl}/api/places/${params.country}/${params.province}/${params.municipality}/${params.place}`,
    {
      next: {
        revalidate: 1,
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
      title={params.place.capitalize()}
      titlePostfix={params.municipality.capitalize()}
      separator={SeparatorTypes.none}
      backLink={`/places/${params.country}/${params.province}/${params.municipality}`}
    >
      <div className="flex flex-col">
        {data?.pois?.map((poiType: { type: string; name: string }) => (
          <Link
            key={poiType.type}
            href={`/pois/${params.place}/${poiType.type}`}
          >
            {poiType.name.capitalize()}
          </Link>
        ))}
      </div>
    </TitledPage>
  );
}
