import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

// GET: /api/places/[country]/
export async function GET(request: Request, context: any) {
  const country = context.params.country;

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
      area["admin_level"="2"]["name"~"^${country}$", i];
      rel["admin_level"="4"](area);
    out center;`,
  });

  if (response.status !== 200) {
    return notFound();
  }

  const data = await response.json();

  data.elements = data.elements.filter((element: any) => {
    let lang = element.tags["ISO3166-2"];

    if (lang.includes("NL")) return element;
  });

  const provinces = data.elements.map((element: any) => {
    return element.tags.name.toLowerCase();
  });

  provinces.sort();

  return NextResponse.json(provinces);
}
