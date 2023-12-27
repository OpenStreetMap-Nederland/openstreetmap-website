import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

// GET: /api/pois/[place]/[type]/
export async function GET(request: Request, context: any) {
  const poiTypes = await import("../../../../../dictionaries/pois.json").then(
    (module) => module.default
  );

  const place = context.params.place;
  const type = context.params.type;

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
      nwr["${poiType?.tag.key}"="${poiType?.tag.value}"]${requredTags}(area);
    out center;`,
  });

  if (response.status !== 200) {
    return notFound();
  }

  const data = await response.json();
  const pois = data.elements.map((element: any) => element);

  pois.sort((a: any, b: any) => {
    return a.tags.name > b.tags.name ? 1 : -1;
  });

  // filter out duplicates on name
  let unique = pois.filter(
    (poi: any, index: number, self: any) =>
      index === self.findIndex((p: any) => p.tags.name === poi.tags.name)
  );

  // add count to unique to show how many duplicates were removed
  unique = unique.map((poi: any) => {
    poi.count = pois.filter((p: any) => p.tags.name === poi.tags.name).length;
    return poi;
  });

  unique.sort((a: any, b: any) => {
    return a.tags.name < b.tags.name ? 1 : -1;
  });

  unique.sort((a: any, b: any) => {
    return a.count < b.count ? 1 : -1;
  });

  return NextResponse.json(unique);
}
