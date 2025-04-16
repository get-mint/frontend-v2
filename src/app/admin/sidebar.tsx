"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { HomeIcon, LeafIcon, UsersIcon, StoreIcon, NewspaperIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: <HomeIcon />,
  },
  {
    title: "Advertisers",
    url: "/admin/advertisers",
    icon: <StoreIcon />,
  },
  {
    title: "Administrators",
    url: "/admin/administrators",
    icon: <UsersIcon />,
  },
  {
    title: "Blog",
    url: "/admin/blog",
    icon: <NewspaperIcon />,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LeafIcon className="w-5 h-5" />
              <span className="text-base font-semibold">Mint Cashback</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url} passHref>
                    <SidebarMenuButton
                      className="hover:bg-primary/10 data-[active=true]:bg-primary/10 data-[active=true]:text-primary py-5 px-4 text-lg transition-all duration-150 cursor-pointer"
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
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
