import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";
import { Logo } from "./logo";
import { Search } from "./search";
import { GithubLink } from "./github-link";
import { UpcomingEvents } from "./upcoming-events";
import { EditButton } from "./edit-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function Header() {
  return (
    <div className="border-b">
      <div className="flex h-15 items-center justify-between container">
        <div className="flex items-center space-x-4">
          <Logo />
          {/* <Search /> */}
          <EditButton />
          <Link
            href="/history"
            className="text-sm font-medium transition-colors hover:text-primary
              text-muted-foreground dark:text-muted-foreground dark:hover:text-primary"
          >
            History
          </Link>
          <UpcomingEvents />
        </div>

        <div className="flex items-center space-x-4 mx-4">
          <MainNav />
          <GithubLink />
          <UserNav />
        </div>
      </div>
    </div>
  );
}
