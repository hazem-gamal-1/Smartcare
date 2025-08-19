import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import { ClerkProvider } from "@clerk/nextjs";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smartcare",
  description:
    "Smartcare is a modern healthcare platform connecting patients with doctors and AI-powered tools. Book appointments, analyze symptoms, and access smart medical services in a clean, mobile-friendly interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navigation></Navigation>
          {children}
          <Footer></Footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
