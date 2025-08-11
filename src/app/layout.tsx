"use client";

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import "../styles/globals.css"
import { SessionProvider } from "next-auth/react";


// export const metadata: Metadata = {
//   title: "PlacementReady",
//   description: "web for placement preparation and practice",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
              <SessionProvider>{children}</SessionProvider>
        
      </body>
    </html>
  );
}
