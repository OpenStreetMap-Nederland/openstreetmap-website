import { Changeset, ChangesetData } from "@/types/changset";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

export default async function ChangesetPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(
    `https://api.openstreetmap.org/api/0.6/changeset/${params.id}?include_discussion=true`,
    {
      headers: {
        "Content-Type": "applicati``on/json",
        Accept: "application/json",
      },
    }
  );

  if (response.status !== 200) {
    return notFound();
  }

  const changesetData: ChangesetData = await response.json();

  const ChangesetViewer = dynamic(() => import("./changeset-viewer"), {
    ssr: false,
  });

  return <ChangesetViewer changeset={changesetData.elements[0]} />;
}
