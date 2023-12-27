import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { SeparatorTypes } from "@/enums/separator-types";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { env } from "process";
import { Diary } from "@/types/diary";
import { eclipse, richTextToPlainText, toInternalLinks } from "@/lib/utils";
import Link from "next/link";
import { RichtextWrapper } from "@/components/richtext-wrapper";

type Props = {
  params: Params;
};

type Params = {
  slug: string[];
};

const getPois = async ({ params }: Props) => {
  const place = params.slug[0] || "";
  const type = params.slug[1] || "";
  const name = params.slug[2] || "";
  const street = params.slug[3] || "";

  if (!place || !type) {
    return notFound();
  }

  let url = `${place}/${type}/${name}/${street}`;

  while (url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  const baseUrl = env.BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/pois/${url}`, {
    next: {
      revalidate: 1,
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

  return await response.json();
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const poiTypes = await import("../../../dictionaries/pois.json").then(
    (module) => module.default
  );

  const data = await getPois({ params });

  const place = params.slug[0] || "";
  const type = params.slug[1] || "";
  const name = params.slug[2] || "";
  const street = params.slug[3] || "";

  const poiType = poiTypes.pois.find((poiType: any) => poiType.type === type);

  if (data.length === 1) {
    const poi = data[0];
    return {
      title: `${poi.tags.name} ${place.capitalize()}${
        poi.tags.branch ? ` ${poi.tags.branch}` : ""
      } OpenStreetMap`,
      description: `Gelegen aan ${
        poi.tags["addr:street"]
      } in ${place.capitalize()} zit ${poiType?.nameOne} ${
        poi.tags.name
      }. Zie de ${
        poi.tags["opening_hours"] ? `openingstijden en` : ""
      } omgeving op OpenStreetMap!`,
    };
  }

  return {
    title: `OpenStreetMap ${poiType?.name.capitalize()} in ${place.capitalize()}`,
    description: `Alle${name ? ` ${name}` : ""} ${
      poiType?.name
    } in ${place.capitalize()}`,
  };
}

export default async function CountryPage({ params }: Props) {
  const poiTypes = await import("../../../dictionaries/pois.json").then(
    (module) => module.default
  );

  const place = params.slug[0] || "";
  const type = params.slug[1] || "";
  const name = params.slug[2] || "";
  const street = params.slug[3] || "";

  const poiType = poiTypes.pois.find((poiType: any) => poiType.type === type);

  const data = await getPois({ params });

  if (data.length === 0) {
    return (
      <TitledPage
        title={`Alle${name ? ` ${name}` : ""} ${
          poiType?.name
        } in ${place.capitalize()}`}
        separator={SeparatorTypes.none}
      >
        <div>
          Geen {poiType?.name} gevonden in {place}
          {name && ` met de naam ${name}`}.
        </div>
      </TitledPage>
    );
  }

  if (data.length === 1) {
    const poi = data[0];
    return (
      <TitledPage title={poi.tags.name} separator={SeparatorTypes.none}>
        <div>een poi</div>
      </TitledPage>
    );
  }

  return (
    <TitledPage
      title={`Alle${name ? ` ${name}` : ""} ${
        poiType?.name
      } in ${place.capitalize()}`}
      separator={SeparatorTypes.none}
    >
      <div>
        {data.map((item: any) => {
          return (
            <div key={item.id}>
              <Link href={`/pois/${place}/${type}/${item.tags.name}`}>
                {item.tags.name}
                {name && ` ${item.tags["addr:street"]}`}
              </Link>
            </div>
          );
        })}
      </div>
    </TitledPage>
  );
}
