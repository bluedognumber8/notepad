import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import StyledComponentsRegistry from "@/lib/registry";
import ApolloProvider from "@/lib/apollo-provider";
import ThemeProvider from "@/lib/theme-provider";
import GlobalStyle from "@/lib/globalstyle-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./layout.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Notepad",
  description: "Learning Next.js, Graphql, mongodb app",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>
          <StyledComponentsRegistry>
            <ApolloProvider>
              <ThemeProvider>
                <GlobalStyle />
                {children}
              </ThemeProvider>
            </ApolloProvider>
          </StyledComponentsRegistry>
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
