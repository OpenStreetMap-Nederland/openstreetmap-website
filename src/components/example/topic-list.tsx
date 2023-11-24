import { DiscourseTopicList } from "@/types/discourse";
import { ExternalLink, Eye, Reply, ReplyAll, ReplyIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

type Props = {
  topicList: DiscourseTopicList;
};

export function TopicList({ topicList }: Props) {
  return (
    <div className="space-y-4">
      {topicList.topics
        .filter((topic) => topic.pinned === false)
        // .filter((topic) => topic.image_url)
        .map((topic) => (
          <Link
            className="flex items-center justify-between gap-4 w-full rounded-lg"
            target="_blank"
            href={`https://community.openstreetmap.org/t/${topic.slug}/${topic.id}`}
            key={topic.id}
          >
            <Card className="items-start justify-between gap-4 w-full p-4 grid grid-cols-1 md:grid-cols-2">
              {topic.image_url && (
                <div className="flex flex-col col-span-1">
                  <div
                    className="justify-center items-center relative col-span-1"
                    style={{ height: "300px" }}
                  >
                    <Image
                      className="overflow-hidden rounded-md"
                      objectFit="cover"
                      alt={topic.title}
                      src={topic.image_url}
                      fill
                    />
                  </div>
                </div>
              )}
              <div
                className={cn(
                  "flex items-center justify-between gap-2 col-span-1",
                  !topic.image_url && "col-span-2"
                )}
              >
                <div className="flex">
                  <h5 className="font-semibold leading-none">{topic.title}</h5>
                  {topic.excerpt && (
                    <p className="text-sm text-muted-foreground">
                      {topic.excerpt}
                    </p>
                  )}
                </div>

                <div className="flex gap-1">
                  <span className="flex items-center gap-1">
                    {topic.posts_count}

                    <Reply className="h-4 w-4 text-muted-foreground" />
                  </span>
                  <span className="flex items-center gap-1">
                    {topic.views}
                    <Eye className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
    </div>
  );
}
