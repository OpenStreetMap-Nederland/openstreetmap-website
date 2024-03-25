import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

// GET: /api/bagbot/importbuilding
export async function POST(
  request: Request,
  context: {
    params: {
      id: string;
    };
  }
) {
  const bagBotUrl = process.env.BAGBOT_URL || "https://localhost:7152";

  const response = await fetch(
    `${bagBotUrl}/api/task/importbuilding/${context.params.id}`,
    {
      method: "POST",
      headers: {
        Accept: "text/html",
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "no-cache",
      },
    }
  );

  if (response.status !== 200) {
    return notFound();
  }

  const json = await response.json();
  return NextResponse.json(json);
}
