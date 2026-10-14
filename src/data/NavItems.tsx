import {
  BookOpen,
  Brain,
  Building2,
  Code2,
  FileText,
  Home,
  MessageSquareText,
  Target,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Roadmap",
    href: "/roadmap",
    icon: Target,
  },
  {
    title: "CS MCQ",
    href: "/cs-mcq",
    icon: Brain,
  },
  {
    title: "DSA Journal",
    href: "/dsa-journal",
    icon: Code2,
  },
  {
    title: "Company Prep",
    href: "/company/tcs",
    icon: Building2,
  },
  {
    title: "Mock Tests",
    href: "/mock-test",
    icon: BookOpen,
  },
  {
    title: "AI Mentor",
    href: "/mentor",
    icon: MessageSquareText,
  },
  {
    title: "Admin",
    href: "/admin",
    icon: Target,
  },
  {
    title: "English Tests",
    href: "/english-test",
    icon: FileText,
  },
];