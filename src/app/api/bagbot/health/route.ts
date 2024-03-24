import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

// GET: /api/bagbot/health
export async function GET(request: Request) {
  const bagBotUrl = process.env.BAGBOT_URL || "https://localhost:7152";
  const response = await fetch(`${bagBotUrl}/api/health`, {
    next: {
      revalidate: false,
    },
    method: "GET",
    headers: {
      Accept: "text/html",
      "Content-Type": "text/html;charset=UTF-8",
    },
  });

  if (response.status !== 200) {
    return notFound();
  }

  const json = await response.text();
  return NextResponse.json(json);
}
