import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { env } from "process";

type Props = React.HTMLAttributes<HTMLElement> & {
  dropdownMenu: boolean;
};

const getNewsId = async () => {
  const baseUrl = env.BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/news`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  if (response.status !== 200) {
    return "";
  }

  const news = await response.json();

  if (!news?.id) {
    return "";
  }

  return news.id as string;
};

export async function MainNav({
  className,
  dropdownMenu = false,
  ...props
}: Props) {
  const links = [
    { href: "/about", label: "Over" },
    { href: "/projects", label: "Projecten" },
    { href: "/events", label: "Evenementen" },
    // { href: "/news", label: "News" },
    { href: "/community", label: "Community" },
    { href: "/contact", label: "Contact" },
  ];

  type LinkProps = {
    href: string;
    label: string;
    badge?: string;
  };

  return (
    <nav
      className={cn("flex", className, {
        "flex-col": dropdownMenu,
        "items-center space-x-2 lg:space-x-4": !dropdownMenu,
      })}
      {...props}
    >
      {links.map(({ href, label, badge }: LinkProps) => {
        if (dropdownMenu) {
          return (
            <Link href={href} key={href}>
              <DropdownMenuItem>
                {label}
                {badge && (
                  <Badge className="ml-1 relative h-4 px-2" variant="secondary">
                    {badge}
                  </Badge>
                )}
              </DropdownMenuItem>
            </Link>
          );
        } else {
          return (
            <Link
              href={href}
              key={href}
              className="text-sm font-medium transition-colors hover:text-primary
                text-muted-foreground dark:text-muted-foreground dark:hover:text-primary
                "
            >
              {label}
              {badge && (
                <Badge className="ml-1 relative h-4 px-2" variant="secondary">
                  {badge}
                </Badge>
              )}
            </Link>
          );
        }
      })}
    </nav>
  );
}
