import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import jsdom from "jsdom";
import { sanitize } from "isomorphic-dompurify";
import { notFound } from "next/navigation";

// GET: /api/news/latest
export async function GET(request: Request) {
  const response = await fetch("https://weeklyosm.eu", {
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
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

  const html = await response.text();
  const { JSDOM } = jsdom;
  const dom = await new JSDOM(html);
  const content = dom.window.document
    .getElementById("recent-posts-2")
    ?.querySelector("ul")
    ?.querySelectorAll("a");

  if (!content) return notFound();

  const ids = Array.from(content).map((item) => {
    const id = item.getAttribute("href")?.split("/")[4];
    return id;
  });

  return NextResponse.json(ids);
}
