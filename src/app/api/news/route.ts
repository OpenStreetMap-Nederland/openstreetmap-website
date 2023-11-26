import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import jsdom from "jsdom";
import { sanitize } from "isomorphic-dompurify";
import { notFound } from "next/navigation";

// GET: /api/news/
export async function GET(request: Request) {
  const response = await fetch("https://weeklyosm.eu", {
    next: {
      revalidate: 60 * 60, // 1 hour
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
  const content = dom.window.document.getElementById("content");

  if (!content) return notFound();

  const header = content
    .querySelector(".header-meta")
    ?.querySelector("a")
    ?.href.split("/");

  const id = header?.[header.length - 1];

  return NextResponse.json({
    id,
  });
}
