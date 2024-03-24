import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

// GET: /api/bagbot/changeset?page=1&pageSize=50&sort[0].field=createdAt&sort[0].order=desc
export async function GET(request: Request) {
  const bagBotUrl = process.env.BAGBOT_URL || "https://localhost:7152";

  const params = request.url.split("?")[1];
  const response = await fetch(`${bagBotUrl}/api/changeset?${params}`, {
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

  const json = await response.json();
  return NextResponse.json(json);
}
