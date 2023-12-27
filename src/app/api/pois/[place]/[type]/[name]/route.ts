import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

// GET: /api/pois/[place]/[type]/
export async function GET(request: Request, context: any) {
  const poiTypes = await import(
    "../../../../../../dictionaries/pois.json"
  ).then((module) => module.default);

  const place = context.params.place;
  const type = context.params.type;
  const name = context.params.name;

  const poiType = poiTypes.pois.find((poiType: any) => poiType.type === type);


  const requredTags = poiType?.required_tags
    .map((tag: any) => {
      return `["${tag.key}"]`;
    })
    ?.join("");

  const response = await fetch("https://www.overpass-api.de/api/interpreter?", {
    next: {
      revalidate: false,
    },
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: `[out:json][timeout:250];
      area["admin_level"="10"]["name"~"^${place}$", i];
      nwr["${poiType?.tag.key}"="${poiType?.tag.value}"]["name"~"^${name}$", i]${requredTags}(area);
    out center;`,
  });

  if (response.status !== 200) {
    return notFound();
  }

  const data = await response.json();
  const pois = data.elements.map((element: any) => element);

  pois.sort((a: any, b: any) => {
    return a.tags.name < b.tags.name ? 1 : -1;
  });

  return NextResponse.json(pois);
}
