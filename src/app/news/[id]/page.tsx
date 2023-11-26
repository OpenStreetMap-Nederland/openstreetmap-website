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
import Image from "next/image";

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

type NewsObject = {
  title: string;
  prevId: string;
  nextId: string;
  content: string;
};

export default async function News({ params }: { params: { id: string } }) {
  const response = await fetch(`http://localhost:3000/api/news/${params.id}`, {
    next: {
      revalidate: false,
    },
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  const newsObject = (await response.json()) as NewsObject;
  const { title, prevId, nextId, content } = newsObject;

  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        return (
          <Image
            src={domNode.attribs.src}
            alt={domNode.attribs.alt}
            width={800}
            height={600}
            className="rounded-lg"
          />
        );
      }

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
      {content && (
        <article className="flex flex-col gap-4">
          {parse(content, options)}
        </article>
      )}
    </TitledPage>
  );
}
