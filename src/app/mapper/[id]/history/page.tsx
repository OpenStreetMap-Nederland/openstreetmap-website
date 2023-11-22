import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { User, UserData } from "@/types/user";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ name: "Tjuro" }];
}

export default async function AboutPage() {
  const response = await fetch(
    "https://www.openstreetmap.org/api/0.6/user/14792647",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );

  const userData: UserData = await response.json();

  if (!userData) {
    return notFound();
  }

  console.log(userData);

  const user: User = userData.user;

  return <div>{user.changesets.count}</div>;
}
