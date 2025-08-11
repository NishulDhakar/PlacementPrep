"use client"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} themes={["light", "dark", "reading"]} defaultTheme="light" enableSystem={false}>
      {children}
    </NextThemesProvider>
  )
}
