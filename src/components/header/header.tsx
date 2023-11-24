import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";
import { Logo } from "./logo";
import { Search } from "./search";
import { GithubLink } from "./github-link";
import { UpcomingEvents } from "./upcoming-events";
import { EditButton } from "./edit-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { cn, getColor } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import { SignOutButton } from "./sign-out-button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Card } from "../ui/card";

export async function Header() {
  return (
    <div className="border-b">
      <div className="hidden lg:flex h-15 items-center justify-between container">
        <div className="items-center space-x-4 flex">
          <Logo />
          {/* <Search /> */}
          <EditButton />
          {/* <Link
            href="/history"
            className="text-sm font-medium transition-colors hover:text-primary
              text-muted-foreground dark:text-muted-foreground dark:hover:text-primary"
          >
            History
          </Link> */}
          <UpcomingEvents />
        </div>

        <div className="flex items-center space-x-6 mx-4">
          <MainNav dropdownMenu={false} />
          <div className="flex items-center space-x-2">
            <GithubLink />
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>

      <div className="lg:hidden flex items-center justify-between px-2 w-full">
        <Logo />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex h-10 w-10 mx-2">
              <HamburgerMenuIcon className="absolute h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-screen border-0 bg-black shadow-none rounded-none bg-transparent p-4 m-0"
            forceMount
          >
            <Card className="p-2">
              <DropdownMenuGroup className="flex">
                <div className="flex items-center space-x-2 justify-between w-full mb-1">
                  <div className="flex items-center space-x-2 mx-2">
                    <GithubLink />
                    <ModeToggle />
                  </div>
                  <div className="flex">
                    <UserNav />
                  </div>
                </div>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <MainNav dropdownMenu={true} />
              </DropdownMenuGroup>
            </Card>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
