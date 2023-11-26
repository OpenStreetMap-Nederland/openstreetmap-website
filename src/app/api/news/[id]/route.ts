import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import jsdom from "jsdom";
import { sanitize } from "isomorphic-dompurify";
import { error } from "console";

const dateFromDateString = (dateString: string) => {
  const date = dateString.split("/");
  const day = date[0];
  const month = date[1];
  const year = date[2];
  return new Date(`${year}-${month}-${day}`);
};

// GET: /api/news/[id]
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const response = await fetch(`https://weeklyosm.eu/archives/${id}`, {
    method: "GET",
    headers: {
      Accept: "text/html",
      "Content-Type": "text/html;charset=UTF-8",
    },
  });

  if (response.status !== 200) {
    return error(response.status + " " + response.statusText);
  }

  const html = await response.text();
  const { JSDOM } = jsdom;
  const dom = await new JSDOM(html);
  const content = dom.window.document.getElementById("content");

  if (!content) return error("No content found");

  const article = content.querySelector("article");
  if (!article) return error("No article found");

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
      // image.remove();

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

  let title = "WeeklyOSM";

  const dateHtmlObject = Array.from(p).find((p) => p.textContent?.length);
  if (dateHtmlObject) {
    const dateSting = dateHtmlObject.textContent?.split("-")[0] ?? "";
    const date = dateFromDateString(dateSting);
    title = `${date.getFullYear()} - Week ${date.getWeek()}`;

    dateHtmlObject.remove();
  }

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

  return NextResponse.json({
    title,
    prevId,
    nextId,
    content: sanitize(article.innerHTML),
  });
}
