import React from "react";
import { redirect } from "next/navigation";
import { env } from "process";

export default async function News() {
  const baseUrl = env.BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/news`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  const news = await response.json();

  redirect(`/news/${news.id}`);
}
