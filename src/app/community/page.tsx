import { TopicList } from "@/components/example/topic-list";
import { UserList } from "@/components/example/user-list";
import { ExternalButton } from "@/components/external-button";
import { TitledPage } from "@/components/layouts/titled-page";
import { Card } from "@/components/ui/card";
import { SeparatorTypes } from "@/enums/separator-types";
import { DiscourseTopicList, DiscourseUser } from "@/types/discourse";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "OpenStreetMap Community",
  description: "De OpenStreetMap community is een wereldwijde gemeenschap.",
};

export default async function CommunityPage() {
  const response = await fetch(
    "https://community.openstreetmap.org/latest.json?category=43",
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

  if (!response) {
    return notFound();
  }

  const data = await response.json();

  let users: DiscourseUser[] = data.users;
  const topicList: DiscourseTopicList = data.topic_list;

  users = users.filter(
    (user) => user.trust_level === 2 || user.trust_level === 3
  );

  // sort randomly but use today as seed
  // this prevents the list from changing on every request
  users.sort((a, b) => {
    const today = new Date();
    const seed = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const randomA = Math.sin(seed.getTime() + a.id) * 10000;
    const randomB = Math.sin(seed.getTime() + b.id) * 10000;

    return randomA - randomB;
  });

  return (
    <TitledPage
      title="Community"
      titlePostfix="forum"
      subTitle="De mensen en discussies van de OpenStreetMap community."
      separator={SeparatorTypes.none}
      actions={
        <ExternalButton href="https://community.openstreetmap.org/">
          Community
        </ExternalButton>
      }
    >
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 lg:col-span-3">
          <TopicList topicList={topicList}></TopicList>
        </div>
        <Card className="p-4 col-span-4 lg:col-span-1">
          <h2 className="text-xl font-bold tracking-tight mb-4 m-2">Members</h2>
          <UserList users={users}></UserList>
        </Card>
      </div>
    </TitledPage>
  );
}
