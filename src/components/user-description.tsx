import { cn } from "@/lib/utils";
import { MarkdownWrapper } from "./markdown-wrapper";
import { User, UserData } from "@/types/user";
import { notFound } from "next/navigation";
import { env } from "process";

const getUser = async (name: string) => {
  if (!name) return null;

  const baseUrl = env.BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/mapper/${name}`, {
    cache: "no-cache",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  if (response.status !== 200) {
    return notFound();
  }

  const userData: UserData = await response.json();
  if (!userData) return null;

  const user: User = userData.user;

  return user;
};

type Props = {};

export async function UserDescription({
  params,
}: {
  params: { name: string };
}) {
  const user = await getUser(params.name);

  if (!user) return null;

  return <MarkdownWrapper>{user.description}</MarkdownWrapper>;
}
