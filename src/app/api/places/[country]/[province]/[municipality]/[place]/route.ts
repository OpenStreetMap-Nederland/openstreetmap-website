import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

// GET: /api/places/[country]/[province]/[municipality]/[place]/
export async function GET(request: Request, context: any) {
  const pois = await import("../../../../../../../dictionaries/pois.json").then(
    (module) => module.default
  );

  return NextResponse.json(pois);
}
