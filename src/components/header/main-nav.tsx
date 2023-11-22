import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const links = [
    // { href: "/traces", label: "GPS Traces" },
    // { href: "/diaries", label: "User Diaries" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },

    { href: "/events", label: "Events" },
    { href: "/news", label: "News" },

    { href: "/community", label: "Community" },
    { href: "/bagbot", label: "BagBot", badge: "New!" },
    // { href: "/copyright", label: "Copyright" },
    // { href: "/help", label: "Help" },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-2 lg:space-x-4", className)}
      {...props}
    >
      {links.map(({ href, label, badge }) => (
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
      ))}
    </nav>
  );
}
