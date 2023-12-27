import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

// GET: /api/places/[country]/[province]/
export async function GET(request: Request, context: any) {
  const province = context.params.province;

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
      area["admin_level"="4"]["name"~"^${province}$", i];
      rel["admin_level"="8"](area);
    out center;`,
  });

  if (response.status !== 200) {
    return notFound();
  }

  const data = await response.json();

  const municipalities = data.elements.map((element: any) => {
    return element.tags.name.toLowerCase();
  });

  municipalities.sort();

  return NextResponse.json(municipalities);
}
