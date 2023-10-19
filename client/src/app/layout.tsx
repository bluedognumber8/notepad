import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import StyledComponentsRegistry from "../lib/registry";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Notepad",
  description: "Learning Next.js, Graphql, mongodb app",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <header>
          <Link href={"/"}>Notepad</Link>
        </header>

        <footer>Page rendered on {new Date().toLocaleString()}</footer>
      </body>
    </html>
  );
}

export default RootLayout;
