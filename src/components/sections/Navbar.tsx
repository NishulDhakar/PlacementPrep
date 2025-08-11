"use client";

import Link from "next/link";
import { GraduationCap, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-md p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <GraduationCap
            className="h-5 w-5 text-emerald-400 transition group-hover:scale-105"
            aria-hidden="true"
          />
          <span className="text-sm font-semibold">PlacementReady</span>
        </Link>

        <div className="flex gap-2 md:gap-4">
          <Button
            asChild
            variant="ghost"
            className="text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

Navbar.defaultProps = {};
