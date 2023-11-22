import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  href: string;
  children: React.ReactNode;
};

export function ExternalButton({ href, children }: Props) {
  return (
    <Link href={href} target="_blank">
      <Button variant={"outline"}>
        {children}
        <ExternalLink className="w-4 h-4 ml-2"></ExternalLink>
      </Button>
    </Link>
  );
}
