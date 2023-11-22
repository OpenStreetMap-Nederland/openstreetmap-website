import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { notFound } from "next/navigation";
import jsdom from "jsdom";
import { ExternalButton } from "@/components/external-button";

export default async function News() {
  // fetch html from https://weeklyosm.eu/
  // parse html

  const response = await fetch("https://weeklyosm.eu/", {
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
  // get the recent-posts-2 id element from the html using jsdom
  const { JSDOM } = jsdom;
  const dom = await new JSDOM(html);
  const recentPosts = dom.window.document.getElementById("recent-posts-2");

  const list: (string | undefined)[] = [];
  const ul = recentPosts?.querySelector("ul");
  ul?.childNodes.forEach((li) => {
    if (li.nodeName !== "LI") {
      return;
    }

    list.push(li.textContent?.trim());
  });

  const content = dom.window.document.getElementById("content");

  // get firts article tag from the content

  const article = content?.querySelector("article");
  // change img to <Image>
  const imgs = article?.querySelectorAll("img");
  imgs?.forEach((img) => {
    const src = img.getAttribute("src");
    if (src) {
      img.outerHTML = `<Image src="${src}" alt="${img.getAttribute("alt")}" />`;
    }
  });

  return (
    <TitledPage
      title="News"
      titlePostfix="WeeklyOSM"
      subTitle="The latest news about OpenStreetMap"
      actions={
        <ExternalButton href="https://weeklyosm.eu/">WeeklyOSM</ExternalButton>
      }
    >
      {list &&
        list.length > 0 &&
        list.map((item) => {
          return <p key={item}>{item}</p>;
        })}
    </TitledPage>
  );
}
