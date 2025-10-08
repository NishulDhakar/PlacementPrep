// app/(dashboard)/layout.tsx
import type React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"  
import "../../styles/globals.css"
import { Header } from "@/components/dashboard/Navbar"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ThemeProvider } from "next-themes"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signup") 
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning className="font-hanken-grotesk flex min-h-screen flex-col bg-neutral-100 antialiased dark:bg-black">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <div className="min-h-screen bg-background">
            <Header />
            <div className="flex">
              <aside className="hidden md:block border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="sticky top-16 h-[calc(100vh-4rem)]">
                  <Sidebar />
                </div>
              </aside>
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
