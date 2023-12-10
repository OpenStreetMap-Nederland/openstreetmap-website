import { NextResponse } from "next/server";
import jsdom from "jsdom";
import { notFound } from "next/navigation";
import { EventDetail } from "@/types/event";

const getEventHTML = async (id: string) => {
  const response = await fetch(`https://osmcal.org/event/${id}`, {
    cache: "force-cache",
    method: "GET",
    headers: {
      Accept: "text/html",
      "Content-Type": "text/html;charset=UTF-8",
    },
  });

  if (response.status !== 200) {
    return ``null;
  }

  const html = await response.text();

  if (html.includes("does not exist")) {
    return null;
  }

  return html;
};

const getEventParticipants = async (id: string) => {
  const response = await fetch(`https://osmcal.org/event/${id}/participants/`, {
    cache: "force-cache",
    method: "GET",
    headers: {
      Accept: "text/html",
      "Content-Type": "text/html;charset=UTF-8",
    },
  });

  if (response.status !== 200) {
    return null;
  }

  const html = await response.text();
  if (!html) return notFound();

  const { JSDOM } = jsdom;
  const dom = await new JSDOM(html);
  const doc = dom.window.document;
  if (!doc) return notFound();

  const userTableRows = doc.querySelectorAll("tr");
  if (!userTableRows) return notFound();

  const usernamesArray: string[] = [];

  userTableRows.forEach((userTableRow) => {
    let username = userTableRow.querySelector("td")?.textContent;
    if (!username) return;
    usernamesArray.push(username);
  });

  return usernamesArray;
};

// GET: /api/event/[id]
export async function GET(
  request: Request,
  context: {
    params: {
      id: string;
    };
  }
) {
  const id = context.params.id;
  if (!id) return notFound();

  const html = await getEventHTML(id);
  if (!html) return notFound();

  const { JSDOM } = jsdom;
  const dom = await new JSDOM(html);
  const doc = dom.window.document;
  if (!doc) return notFound();

  const name = doc.querySelector("h1")?.textContent ?? "Event name";

  const startDescription = doc.querySelector(".event-single-date");
  // get all elements after the start description until the div ends

  let description: Element[] = [];
  let nextElement = startDescription?.nextElementSibling;

  while (nextElement !== null) {
    nextElement = nextElement?.nextElementSibling;
    let content = nextElement ?? "";
    if (content !== "") {
      // make sute that content is not a string
      if (typeof content === "string") {
        continue;
      }
      description.push(content);
    }
  }

  let bottomButtons = description.pop()?.querySelectorAll("a");
  let website = null;
  if (bottomButtons && bottomButtons?.length > 1) {
    website = bottomButtons[0].href;
  }

  const descriptionText: string = description
    .map((element) => {
      return element?.textContent;
    })
    .join("\n");

  const creator = doc
    .querySelector(".event-single-attribution")
    ?.querySelector("a")?.textContent;
  if (!creator) return notFound();

  const EventDetail: EventDetail = {
    id: id,
    name: name,
    description: descriptionText,
    creator,
    attendees: (await getEventParticipants(id)) ?? [],
    website: website,
  };

  return NextResponse.json(EventDetail);
}
