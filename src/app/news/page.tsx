import React from "react";
import { notFound, redirect } from "next/navigation";
import { env } from "process";

export default async function News() {
  try {
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

    if (response.status !== 200) {
      return notFound();
    }

    const news = await response.json();

    if (!news?.id) {
      return notFound();
    }

    redirect(`/news/${news.id}`);
  } catch (error) {}
}
