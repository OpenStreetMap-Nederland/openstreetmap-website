import React from "react";
import { notFound } from "next/navigation";
import jsdom from "jsdom";
import { redirect } from "next/navigation";

const getPage = async () => {
  const response = await fetch("https://weeklyosm.eu", {
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

  return content;
};

export default async function News() {
  const content = await getPage();
  if (!content) return notFound();

  const header = content
    .querySelector(".header-meta")
    ?.querySelector("a")
    ?.href.split("/");

  const id = header?.[header.length - 1];
  redirect(`/news/${id}`);
}
