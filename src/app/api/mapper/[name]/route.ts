import { NextResponse } from "next/server";
import { notFound } from "next/navigation";
import { UserData } from "@/types/user";

const getUserData = async (uid: string) => {
  const response = await fetch(
    `https://www.openstreetmap.org/api/0.6/user/${uid}`,
    {
      cache: "no-cache",
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

const getUIDFromName = async (name: string) => {
  let names = await fetch(
    `https://whosthat.osmz.ru/whosthat.php?action=names&q=${name}`,
    {
      cache: "force-cache",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );

  if (names.status !== 200) return null;
  const data = await names.json();
  if (data.length === 0) return null;
  return data[0].id;
};

// GET: /api/mapper/[name]
export async function GET(request: Request, context: any) {
  const name = context.params.name;

  const uid = await getUIDFromName(name);
  if (!uid) return notFound();

  const userData = await getUserData(uid);
  if (!userData) return notFound();

  return NextResponse.json(userData);
}
