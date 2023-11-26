import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { notFound } from "next/navigation";
import jsdom from "jsdom";
import { ExternalButton } from "@/components/external-button";
import { Metadata } from "next";
import parse from "html-react-parser";
import { SeparatorTypes } from "@/enums/separator-types";
import { sanitize } from "isomorphic-dompurify";
import { removeDomain } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return [{ id: "16846" }, { id: "16857" }];
}

const getPage = async (id: string) => {
  const response = await fetch(`https://weeklyosm.eu/archives/${id}`, {
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

  return content;
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const content = await getPage(params.id);
  if (!content) return notFound();

  const article = content.querySelector("article");
  if (!article) return notFound();

  const p = article.querySelectorAll("p");

  const dateHtmlObject = Array.from(p).find((p) => p.textContent?.length);
  if (!dateHtmlObject) return notFound();

  const dateSting = dateHtmlObject.textContent?.split("-")[0];
  if (!dateSting) return notFound();

  const date = dateFromDateString(dateSting);
  const title = `${date.getFullYear()} week ${date.getWeek()}`;

  dateHtmlObject.remove();

  // get first li
  const lis = article.querySelectorAll("li");
  if (!lis) return notFound();

  const description = `${lis[0].textContent?.trim()} ${lis[1].textContent?.trim()}`;

  const image = article.querySelector("img");
  const src = image?.src;
  if (!src) return notFound();
  const imageUrl = removeDomain(image.src);

  return {
    title: `OpenStreetMap news ${title}`,
    description: description,
    metadataBase: new URL("https://weeklyosm.eu/"),
    keywords: ["OpenStreetMap News", `Week ${date.getWeek()}`],
    publisher: "WeeklyOSM",
    creator: "WeeklyOSM",
    openGraph: {
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: `OpenStreetMap news ${title}`,
        },
      ],
    },
  };
}

const dateFromDateString = (dateString: string) => {
  const date = dateString.split("/");
  const day = date[0];
  const month = date[1];
  const year = date[2];
  return new Date(`${year}-${month}-${day}`);
};

export default async function News({ params }: { params: { id: string } }) {
  const content = await getPage(params.id);
  if (!content) return notFound();

  const article = content.querySelector("article");
  if (!article) return notFound();

  // step 1: remove all syling
  const styles = article.querySelectorAll("[style]");
  styles?.forEach((style) => {
    style.removeAttribute("style");
  });

  // step 2: remove header and footer
  article.querySelector("header")?.remove();
  article.querySelector("footer")?.remove();

  // step 3: style the headings
  const headings = article.querySelectorAll("h2");
  headings.forEach((heading) => {
    heading.classList.add("text-2xl", "font-bold", "mt-4", "mb-2");
  });

  // step 4: remove the Upcoming Events
  headings.forEach((heading) => {
    if (heading.textContent?.includes("Upcoming Events")) {
      heading.nextElementSibling?.remove();
      heading.remove();
    }
  });

  // step 5: add styling to images and remove all images except the first one
  const images = article.querySelectorAll("img");
  if (images) {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (i !== 0) {
        image.remove();
        continue;
      }

      image.classList.add("w-full", "rounded-lg", "mt-4", "mb-2");
    }
  }

  // step 6: remove all "►"
  const lis = article.querySelectorAll("li");
  lis.forEach((li) => {
    li.innerHTML = li.innerHTML.replaceAll("►", "");
  });

  // step 7: change user links to internal links
  // const as = article.querySelectorAll("a");
  // as?.forEach((a) => {
  //   if (a.href.includes("https://www.openstreetmap.org/user")) {
  //     a.href = a.href.replace("https://www.openstreetmap.org/user", "/mapper");
  //   }
  // });

  // step 8: remove .sharedaddy
  article.querySelector(".sharedaddy")?.remove();

  // get last p element
  const p = article.querySelectorAll("p");
  const lastP = p[p.length - 1];

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

  const dateHtmlObject = Array.from(p).find((p) => p.textContent?.length);
  if (!dateHtmlObject) return notFound();

  const dateSting = dateHtmlObject.textContent?.split("-")[0];
  if (!dateSting) return notFound();

  const date = dateFromDateString(dateSting);
  const title = `${date.getFullYear()} - Week ${date.getWeek()}`;

  dateHtmlObject.remove();

  const pagination = content?.querySelector("nav");

  const prevhref = pagination
    ?.querySelector(".nav-previous")
    ?.querySelector("a")
    ?.href.split("/");
  const nexthref = pagination
    ?.querySelector(".nav-next")
    ?.querySelector("a")
    ?.href.split("/");

  const prevId = prevhref?.[prevhref.length - 1];
  const nextId = nexthref?.[nexthref.length - 1];

  return (
    <TitledPage
      title={title}
      titlePostfix="WeeklyOSM"
      subTitle="De laatste nieuwsberichten over OpenStreetMap. Gemaakt door WeeklyOSM."
      separator={SeparatorTypes.none}
      actions={
        <div className="flex gap-4">
          {prevId && (
            <Link href={`/news/${prevId}`}>
              <Button>Previous</Button>
            </Link>
          )}

          {nextId && (
            <Link href={`/news/${nextId}`}>
              <Button>Next</Button>
            </Link>
          )}
        </div>
      }
    >
      {article && (
        <article className="flex flex-col gap-4">
          {parse(sanitize(article.innerHTML), options)}
        </article>
      )}
    </TitledPage>
  );
}
