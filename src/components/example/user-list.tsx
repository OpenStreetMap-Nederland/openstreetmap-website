import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type DiscourseUser = {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
  trust_level: number;
};

type Props = {
  users: DiscourseUser[];
};

export function UserList({ users }: Props) {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Link
          prefetch={false}
          className="flex items-center justify-between gap-4 rounded-md p-2"
          key={user.id}
          href={`/mapper/${user.username.replace(" ", "_")}`}
        >
          <div className="flex items-center h-9">
            <Avatar className="h-9 w-9">
              <Image
                src={`https://community.openstreetmap.org${user.avatar_template.replace(
                  "{size}",
                  "36"
                )}`}
                alt={user.username}
                width={36}
                height={36}
                unoptimized
              ></Image>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.username}
              </p>
              <p className="text-sm text-muted-foreground">{user.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
