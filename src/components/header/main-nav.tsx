import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "../ui/dropdown-menu";

type Props = React.HTMLAttributes<HTMLElement> & {
  dropdownMenu: boolean;
};

export function MainNav({ className, dropdownMenu = false, ...props }: Props) {
  const links = [
    // { href: "/traces", label: "GPS Traces" },
    // { href: "/diaries", label: "User Diaries" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },

    { href: "/events", label: "Events" },
    // { href: "/news", label: "News" },

    { href: "/community", label: "Community" },
    // { href: "/bagbot", label: "BagBot", badge: "New!" },
    // { href: "/copyright", label: "Copyright" },
    // { href: "/help", label: "Help" },
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
