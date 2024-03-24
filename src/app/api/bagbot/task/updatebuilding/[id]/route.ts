import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

// GET: /api/bagbot/importbuilding
export async function PUT(
  request: Request,
  context: {
    params: {
      id: string;
    };
  }
) {
  const bagBotUrl = process.env.BAGBOT_URL || "https://localhost:7152";

  const response = await fetch(
    `${bagBotUrl}/api/task/updatebuilding/${context.params.id}`,
    {
      next: {
        revalidate: false,
      },
      method: "PUT",
      headers: {
        Accept: "text/html",
        "Content-Type": "text/html;charset=UTF-8",
      },
    }
  );

  if (response.status !== 200) {
    return notFound();
  }

  const json = await response.json();
  return NextResponse.json(json);
}
