import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/about.css";
import "../styles/contact.css";
import "../styles/footer.css";
import "../styles/assistant.css";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Footer";
import AIWaiter from "@/components/AIWaiter/AIWaiter";
import { ThemeProvider } from "../components/Theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snergize Studio",
  description: "Interactive portfolio with an assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#f8fbff] text-[#0b1f3b] antialiased dark:bg-[#050814] dark:text-[#e6edf7]`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer />
          <AIWaiter />
        </ThemeProvider>
      </body>
    </html>
  );
}
