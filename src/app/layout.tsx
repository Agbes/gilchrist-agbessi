"use client"
import "@/app/globals.css";

import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <html lang="fr">
        <body>{children}</body>
      </html>
    </SessionProvider>
  )
}
