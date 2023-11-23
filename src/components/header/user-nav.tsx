"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { cn, getColor } from "@/lib/utils";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { use, useEffect, useState } from "react";
import { User } from "@/types/user";
import { Skeleton } from "@/components/ui/skeleton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { SignOutButton } from "./sign-out-button";
import { SignInButton } from "./sign-in-button";
import Image from "next/image";

export function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const session = useSession();

  useEffect(() => {
    const sesionUser = session?.data?.user;

    if (!sesionUser) return;
    setLoading(true);
    fetch(`https://api.openstreetmap.org/api/0.6/user/${sesionUser.name}`, {
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }

        return response.json();
      })
      .then((data) => {
        if (!data.user) {
          throw new Error("User not found");
        }
        setUser(data.user);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [session]);

  if (
    session.status === "loading" ||
    loading ||
    (!user && session.status !== "unauthenticated")
  ) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  if (session.status === "unauthenticated") {
    return <SignInButton />;
  }

  if (!user) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className={"h-8 w-8"}>
            {user?.img?.href ? (
              <div>
                <Image
                  alt={user.display_name}
                  width="65"
                  height="65"
                  src={user?.img?.href}
                  priority={true}
                ></Image>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            ) : (
              <AvatarFallback
                className={cn(
                  getColor(user.id + "", 400),
                  "text-gray-100 font-semibold text-sm dark:text-white"
                )}
              >
                {user.display_name
                  .split(" ")
                  .map((word: string) => {
                    const capitalLetters = word
                      .split("")
                      .filter((char) => /[A-Z]/.test(char));
                    return capitalLetters.join("");
                  })
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex justify-between">
            <div className="flex flex-col space-y-1">
              <p className="text-base font-medium leading-none">
                {user.display_name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.id}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/mapper/${user.id}`}>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          {/* <Link href="/settings">
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⇧S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
