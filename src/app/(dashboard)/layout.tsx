import type React from "react"
import "../../styles/globals.css"
import { Header } from "@/components/dashboard/Navbar"
import { ThemeProvider } from "@/components/dashboard/theme-provider"
import { Sidebar } from "@/components/dashboard/sidebar"



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
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
