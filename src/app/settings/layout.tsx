import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/app/settings/components/sidebar-nav";
import { TitledPage } from "@/components/layouts/titled-page";
import { SeparatorTypes } from "@/enums/separator-types";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Account",
    href: "/account",
  },
  {
    title: "Appearance",
    href: "/appearance",
  },
  {
    title: "Notifications",
    href: "/notifications",
  },
  {
    title: "Display",
    href: "/display",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <TitledPage
      title="Settings"
      subTitle="Manage your account settings and preferences."
      separator={SeparatorTypes.line}
    >
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </TitledPage>
  );
}
