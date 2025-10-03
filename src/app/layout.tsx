// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // title: "MMH Agent Center",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The 'suppressHydrationWarning' prop is the key fix here.
    // It tells React to ignore minor mismatches on the root element,
    // which are often caused by browser extensions.
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background`}>
        {children}
      </body>
    </html>
  );
}
