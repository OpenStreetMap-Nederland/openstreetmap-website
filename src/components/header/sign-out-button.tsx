"use client";
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <DropdownMenuItem onClick={() => signOut()}>
      Uitloggen
      <DropdownMenuShortcut>⇧Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}
