"use client"

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/data/NavItems";
import { accountItems } from "@/data/accountItems";

interface SidebarProps {
  className?: string;
}

type AccountItem = {
  title: string;
  href?: string | null;
  icon: React.ComponentType<{ className?: string }>;
  action?: () => void;
};

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActiveRoute = (href?: string | null) => {
    if (!href || href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const accountList = accountItems as AccountItem[];

  return (
  <div
      className={cn(
        "pb-12 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2 flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-lg font-semibold tracking-tight">Navigation</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft
              className={cn(
                "hidden md:block h-6 w-6 transition-transform border border-primary rounded-full",
                collapsed && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Navigation items */}
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActiveRoute(item.href) ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActiveRoute(item.href) &&
                    "bg-primary/10 text-primary hover:bg-primary/20",
                  collapsed && "px-2"
                )}
              >
                <item.icon
                  className={cn("h-4 w-4 ml-2", !collapsed && "mr-2")}
                />
                {!collapsed && item.title}
              </Button>
            </Link>
          ))}
        </div>
<div className="px-3 py-2">
  {!collapsed && (
    <h3 className="text-sm font-medium text-muted-foreground mb-2">
      Account
    </h3>
  )}
  <div className="space-y-1">
    {accountList.map((item) =>
      item.action ? (
        <Button
          key={item.title}
          variant={item.href ? (isActiveRoute(item.href) ? "secondary" : "ghost") : "ghost"}
          onClick={item.action}
          className={cn(
            "w-full justify-start",
            item.href && isActiveRoute(item.href) &&
              "bg-primary/10 text-primary hover:bg-primary/20",
            collapsed && "px-2"
          )}
        >
          <item.icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
          {!collapsed && item.title}
        </Button>
      ) : (
        <Link key={item.title} href={item.href || "/"}>
          <Button
            variant={isActiveRoute(item.href) ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              isActiveRoute(item.href) &&
                "bg-primary/10 text-primary hover:bg-primary/20",
              collapsed && "px-2"
            )}
          >
            <item.icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
            {!collapsed && item.title}
          </Button>
        </Link>
      )
    )}
  </div>
</div>



      </div>
    </div>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <ScrollArea className="h-full">
          <Sidebar />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
