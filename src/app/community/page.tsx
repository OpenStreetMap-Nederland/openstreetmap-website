import { TopicList } from "@/components/example/topic-list";
import { UserList } from "@/components/example/user-list";
import { ExternalButton } from "@/components/external-button";
import { TitledPage } from "@/components/layouts/titled-page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SeparatorTypes } from "@/enums/separator-types";
import { DiscourseTopicList, DiscourseUser } from "@/types/discourse";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

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
  const data = await response.json();
  if (!data) {
    return {
      notFound: true,
    };
  }

  const users: DiscourseUser[] = data.users;
  const topicList: DiscourseTopicList = data.topic_list;

  return (
    <TitledPage
      title="Community"
      titlePostfix="forum"
      subTitle="OpenStreetMap is build by real people like you and me."
      separator={SeparatorTypes.none}
      actions={
        <ExternalButton href="https://community.openstreetmap.org/">
          community
        </ExternalButton>
      }
    >
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <TopicList topicList={topicList}></TopicList>
        </div>
        <Card className="p-4 col-span-1">
          <h2 className="text-xl font-bold tracking-tight mb-4 m-2">Members</h2>
          <UserList users={users}></UserList>
        </Card>
      </div>
    </TitledPage>
  );
}
