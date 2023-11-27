import { NextResponse } from "next/server";
import jsdom from "jsdom";
import { notFound } from "next/navigation";
import { toInternalLinks } from "@/lib/utils";
import { Diary } from "@/types/diary";

const fetchDiary = async (name: string, id: string) => {
  const response = await fetch(
    `https://www.openstreetmap.org/user/${name}/diary/${id}`,
    {
      cache: "force-cache",
      method: "GET",
      headers: {
        Accept: "text/html",
        "Content-Type": "text/html;charset=UTF-8",
      },
    }
  );

  if (response.status !== 200) {
    return null;
  }

  const html = await response.text();

  if (html.includes("No entry with the")) {
    return null;
  }

  return html;
};

const normalizeName = (name: string) => {
  return name.replaceAll("_", " ");
};

const getDiaryFromUsernameAndId = async (name: string, id: string) => {
  let html = await fetchDiary(name, id);

  // If the user has an underscore in their name,
  // it is possible that the user has a space in their name
  if (!html) html = await fetchDiary(normalizeName(name), id);
  if (!html) return notFound();

  const { JSDOM } = jsdom;
  const dom = await new JSDOM(html);
  const doc = dom.window.document;

  const titleElement = doc.querySelector("h2");
  const subTitleElement = titleElement?.nextElementSibling;
  const subTitleLinks = subTitleElement?.querySelectorAll("a");

  const title = titleElement?.textContent;
  const creator = subTitleLinks?.[0]?.textContent;

  // get text after the first subtitle link
  const rawDateString = subTitleElement?.textContent
    ?.split(subTitleLinks?.[0]?.textContent || "")?.[1]
    ?.trim()
    .split(" ");

  let day = rawDateString?.[1];
  let month = rawDateString?.[2];
  let year = rawDateString?.[3];
  if (!day || !month || !year) return notFound();
  const date = new Date(`${day} ${month} ${year} UTC`);

  const languageUrl = subTitleLinks?.[1]?.href?.split("/");
  const language = languageUrl?.[languageUrl.length - 1];

  const contentElement = doc.querySelector(".richtext");
  const content = toInternalLinks(contentElement?.innerHTML || "");

  const diary: Diary = {
    title: title || "",
    language: language || "en",
    creator: creator || "",
    date: date.toISOString() || "",
    content: content || "",
  };

  return diary;
};

// GET: /api/mapper/[name]/diary/[id]
export async function GET(request: Request, context: any) {
  const name = context.params.name;
  const id = context.params.id;

  const diary: Diary = await getDiaryFromUsernameAndId(name, id);

  return NextResponse.json(diary);
}
