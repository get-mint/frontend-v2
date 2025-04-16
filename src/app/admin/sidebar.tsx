"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  HomeIcon,
  LeafIcon,
  UsersIcon,
  StoreIcon,
  NewspaperIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const sections = [
  {
    label: "Main",
    items: [
      {
        title: "Home",
        url: "/admin",
        icon: <HomeIcon />,
      },
      {
        title: "Administrators",
        url: "/admin/administrators",
        icon: <UsersIcon />,
      },
    ],
  },
  {
    label: "Partnerships",
    items: [
      {
        title: "Advertisers",
        url: "/admin/advertisers",
        icon: <StoreIcon />,
      },
    ],
  },
  {
    label: "Advertising",
    items: [
      {
        title: "Blog",
        url: "/admin/blog",
        icon: <NewspaperIcon />,
      },
    ],
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          {sections.map((section) => (
            <React.Fragment key={section.label}>
              <SidebarGroupLabel className="text-sm">
                {section.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <Link href={item.url} passHref>
                        <SidebarMenuButton
                          className="hover:bg-primary/10 data-[active=true]:bg-primary/10 font-semibold data-[active=true]:font-semibold data-[active=true]:text-primary py-5 px-4 text-lg transition-all duration-150 cursor-pointer"
                          data-active={pathname === item.url}
                        >
                          {item.icon}
                          <span className="text-base">{item.title}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </React.Fragment>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
