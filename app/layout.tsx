import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CareSaathi - Your Companion in Care",
  description:
    "India's most trusted healthcare platform providing 24/7 emergency response, home care, and emotional support. Apno ke liye apno jaisa saathi.",
  keywords: "healthcare, emergency response, home care, elderly care, medical assistance, India",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" storageKey="caresaathi-ui-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
