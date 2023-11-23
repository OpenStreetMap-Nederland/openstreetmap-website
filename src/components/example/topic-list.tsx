import { DiscourseTopicList } from "@/types/discourse";
import { ExternalLink, Eye, Reply, ReplyAll, ReplyIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "../ui/card";

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
            <Card className="flex items-start justify-between gap-4 w-full p-4">
              <div className="flex flex-col">
                <div className="flex gap-4">
                  {topic.image_url && (
                    <div
                      className="hidden lg:flex justify-center items-center relative"
                      style={{ height: "300px", width: "400px" }}
                    >
                      <Image
                        className="overflow-hidden rounded-md"
                        alt={topic.title}
                        src={topic.image_url}
                        fill
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <h5 className="font-semibold leading-none">
                      {topic.title}
                    </h5>
                    {topic.excerpt && (
                      <p className="text-sm text-muted-foreground">
                        {topic.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* replys */}
                <span className="flex items-center gap-1">
                  {topic.posts_count}

                  <Reply className="h-4 w-4 text-muted-foreground" />
                </span>
                <span className="flex items-center gap-1">
                  {topic.views}
                  <Eye className="h-4 w-4" />
                </span>
              </div>
            </Card>
          </Link>
        ))}
    </div>
  );
}
