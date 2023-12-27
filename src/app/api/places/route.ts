import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

// GET: /api/places/
export async function GET(request: Request, context: any) {
  return NextResponse.json(["nederland"]);
}
