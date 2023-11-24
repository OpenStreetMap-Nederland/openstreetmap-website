import React from "react";
import { TitledPage } from "@/components/layouts/titled-page";
import { User, UserData } from "@/types/user";
import { SeparatorTypes } from "@/enums/separator-types";
import Markdown from "react-markdown";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

const generateImageLink = (href: string) => {
  return `/_next/image?url=${encodeURIComponent(href)}&w=128&q=75`;
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const user = await getUser(params.id);
  if (!user) return notFound();

  return {
    title: user.display_name,
    description: user.description,
    openGraph: {
      type: "profile",
      images: [
        {
          url: generateImageLink(
            user.img?.href ??
              "https://www.openstreetmap.org/assets/osm_logo_256-ed028f90468224a272961c380ecee0cfb73b8048b34f4b4b204b7f0d1097875d.png"
          ),
          width: 100,
          height: 100,
          alt: user.display_name,
        },
      ],
    },
  };
}

const getIDFromUserName = async (userName: string) => {
  const response = await fetch(
    `https://whosthat.osmz.ru/whosthat.php?action=names&q=${userName}`,
    {
      next: {
        revalidate: 60 * 60 * 24 * 7, // 1 week
      },
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
  if (response.status !== 200) return null;

  const data = await response.json();
  if (!data || !data[0]) return null;

  let names = data[0].names as string[];

  if (names.length === 0) return null;
  if (names[names.length - 1].toLowerCase() !== userName.toLowerCase())
    return null;

  return data[0].id;
};

const getUser = async (userName: string) => {
  if (!userName) return null;

  const id = await getIDFromUserName(userName);

  if (!id) return null;

  const response = await fetch(
    `https://www.openstreetmap.org/api/0.6/user/${id}`,
    {
      next: {
        revalidate: 60 * 60, // 1 hour
      },
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
  if (response.status !== 200) return null;

  const userData: UserData = await response.json();
  if (!userData) return null;

  const user: User = userData.user;

  return user;
};

export default async function AboutPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);
  if (!user) return notFound();

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
