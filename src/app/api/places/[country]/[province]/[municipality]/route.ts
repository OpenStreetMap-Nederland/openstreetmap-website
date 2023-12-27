import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

// GET: /api/places/[country]/[province]/[municipality]/
export async function GET(request: Request, context: any) {
  const municipality = context.params.municipality;

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
      area["admin_level"="8"]["name"~"^${municipality}$", i];
      rel["admin_level"="10"](area);
    out center;`,
  });

  if (response.status !== 200) {
    return notFound();
  }

  const data = await response.json();

  const places = data.elements.map((element: any) => {
    return element.tags.name.toLowerCase();
  });

  places.sort();

  return NextResponse.json(places);
}
