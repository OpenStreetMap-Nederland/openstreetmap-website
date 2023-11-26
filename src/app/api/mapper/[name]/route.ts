import { NextResponse } from "next/server";
import jsdom from "jsdom";
import { notFound } from "next/navigation";
import { UserData } from "@/types/user";

const getUIDFromChangeset = async (id: string) => {
  const response = await fetch(
    `https://api.openstreetmap.org/api/0.6/changeset/${id}`,
    {
      cache: "force-cache",
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

  const data = await response.json();
  return data?.elements?.[0]?.uid;
};

const fetchHistory = async (name: string) => {
  return await fetch(
    `https://www.openstreetmap.org/user/${name}/history?list=1`,
    {
      cache: "force-cache",
      method: "GET",
      headers: {
        Accept: "text/html",
        "Content-Type": "text/html;charset=UTF-8",
      },
    }
  );
};

const normalizeName = (name: string) => {
  return name.replaceAll("_", " ");
};

const getFirstChangesetFromUserByName = async (name: string) => {
  name = normalizeName(name);

  let response = await fetchHistory(name);

  if (response.status !== 200) {
    let response = await fetchHistory(name.replaceAll(" ", "_"));

    if (response.status !== 200) {
      return notFound();
    }
  }

  const html = await response.text();

  const { JSDOM } = jsdom;

  const dom = await new JSDOM(html);
  const a = dom.window.document?.querySelector("a");
  const id = a?.getAttribute("href")?.split("/");
  if (!id) return notFound();

  return id[id.length - 1];
};

const getUserData = async (uid: string) => {
  const response = await fetch(
    `https://www.openstreetmap.org/api/0.6/user/${uid}`,
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

  const data = await response.json();

  return data as UserData;
};

// GET: /api/mapper/[name]
export async function GET(request: Request, context: any) {
  const name = context.params.name;

  const changesetId = await getFirstChangesetFromUserByName(name);
  if (!changesetId) return notFound();

  const uid = await getUIDFromChangeset(changesetId);
  if (!uid) return notFound();

  const userData = await getUserData(uid);
  if (!userData) return notFound();

  return NextResponse.json(userData);
}
