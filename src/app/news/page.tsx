import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { notFound } from "next/navigation";
import jsdom from "jsdom";
import { ExternalButton } from "@/components/external-button";
import { Metadata } from "next";
import parse from "html-react-parser";
import { SeparatorTypes } from "@/enums/separator-types";

export const metadata: Metadata = {
  title: "OpenStreetMap News",
  description: "De laatste nieuwsberichten over OpenStreetMap.",
};

export default async function News() {
  // fetch html from https://weeklyosm.eu/
  // parse html

  const response = await fetch("https://weeklyosm.eu/", {
    next: {
      revalidate: 60 * 60 * 2, // 2 hours
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
  const article = content?.querySelector("article");

  // step 1: remove all syling
  const styles = article?.querySelectorAll("[style]");
  styles?.forEach((style) => {
    style.removeAttribute("style");
  });

  // step 2: remove header and footer
  article?.querySelector("header")?.remove();
  article?.querySelector("footer")?.remove();

  // step 3: style the headings
  const headings = article?.querySelectorAll("h2");
  headings?.forEach((heading) => {
    heading.classList.add("text-2xl", "font-bold", "mt-4", "mb-2");
  });

  // step 4: remove the Upcoming Events
  headings?.forEach((heading) => {
    if (heading.textContent?.includes("Upcoming Events")) {
      heading.nextElementSibling?.remove();
      heading.remove();
    }
  });

  // step 5: add styling to images and remove all images except the first one
  const images = article?.querySelectorAll("img");
  if (images) {
    for (let i = 0; i < images?.length; i++) {
      const image = images[i];
      if (i !== 0) {
        image.remove();
        continue;
      }

      image.classList.add("w-full", "rounded-lg", "mt-4", "mb-2");
    }
  }

  // step 6: remove all "►"
  const lis = article?.querySelectorAll("li");
  lis?.forEach((li) => {
    li.innerHTML = li.innerHTML.replaceAll("►", "");
  });

  // step 7: change user links to internal links
  // const as = article?.querySelectorAll("a");
  // as?.forEach((a) => {
  //   if (a.href.includes("https://www.openstreetmap.org/user")) {
  //     a.href = a.href.replace("https://www.openstreetmap.org/user", "/mapper");
  //   }
  // });

  // step 8: remove .sharedaddy
  article?.querySelector(".sharedaddy")?.remove();

  // get last p element
  const p = article?.querySelectorAll("p");
  const lastP = p?.[p.length - 1];

  if (lastP) {
    lastP.classList.add("text-center", "mt-12");
  }

  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "code") {
        return (
          <span className="bg-gray-100 dark:bg-gray-800 rounded-md px-1.5 py-0.5 hover:underline">
            {domNode.children[0].data}
          </span>
        );
      }
    },
  };

  return (
    <TitledPage
      title="News"
      titlePostfix="WeeklyOSM"
      subTitle="De laatste nieuwsberichten over OpenStreetMap. Gemaakt door WeeklyOSM."
      separator={SeparatorTypes.none}
      actions={
        <ExternalButton href="https://weeklyosm.eu/">WeeklyOSM</ExternalButton>
      }
    >
      {article && (
        <div className="flex flex-col gap-4">
          {parse(article.innerHTML, options)}
        </div>
      )}
    </TitledPage>
  );
}
