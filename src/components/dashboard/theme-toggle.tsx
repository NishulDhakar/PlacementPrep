"use client"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sun, Moon, BookOpen } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 reading:-rotate-90 reading:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 reading:rotate-90 reading:scale-0" />
          <BookOpen className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all reading:rotate-0 reading:scale-100 dark:rotate-90 dark:scale-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Day Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Night Mode
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("reading")}>
          <BookOpen className="mr-2 h-4 w-4" />
          Reading Mode
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
