import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { User, UserData } from "@/types/user";
import { SeparatorTypes } from "@/enums/separator-types";
import Markdown from "react-markdown";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function AboutPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(
    "https://www.openstreetmap.org/api/0.6/user/" + id,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );

  if (response.status !== 200) {
    return notFound();
  }

  const userData: UserData = await response.json();

  if (!userData) {
    return {
      notFound: true,
    };
  }

  const user: User = userData.user;

  return (
    <TitledPage
      title={user.display_name}
      titlePostfix={
        user.roles.length === 0
          ? "Mapper"
          : user.roles
              .map((role) => role.replace("role_", ""))
              .join(", ")
              .capitalize()
      }
      subTitle={`Already a mapper for ${Math.floor(
        (new Date().getTime() - new Date(user.account_created).getTime()) /
          (1000 * 60 * 60 * 24)
      )} days!`}
      separator={SeparatorTypes.space}
      actions={
        user.img && (
          <Image
            src={user.img?.href}
            alt={user.display_name}
            width={100}
            height={100}
            className="rounded-md"
          ></Image>
        )
      }
    >
      <Separator />
      <Markdown>{user.description}</Markdown>
    </TitledPage>
  );
}
