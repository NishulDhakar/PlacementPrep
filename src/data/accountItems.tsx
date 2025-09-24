import { User, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const accountItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Log out",
    href: null,
    icon: LogOut,
    action: () => signOut({ callbackUrl: "/" }),
  },
];
