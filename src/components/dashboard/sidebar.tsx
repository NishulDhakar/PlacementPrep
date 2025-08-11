"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {

  Menu,
  ChevronLeft,

} from "lucide-react"
import { cn } from "@/lib/utils"
import { navigationItems } from "@/data/NavItems"
import { accountItems } from "@/data/accountItems"


interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

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
                "h-6 w-6 transition-transform border border-primary rounded-full",
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
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href &&
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
          {!collapsed && <h3 className="text-sm font-medium text-muted-foreground mb-2">Account</h3>}
          <div className="space-y-1">
            {accountItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-primary/10 text-primary hover:bg-primary/20",
                    collapsed && "px-2",
                  )}
                >
                  <item.icon className={cn("h-4 w-4", !collapsed && "mr-2")} />
                  {!collapsed && item.title}
                </Button>
              </Link>
            ))}
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
