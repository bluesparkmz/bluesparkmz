import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import Providers from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BlueSpark MZ",
    template: "%s | BlueSpark MZ",
  },
  description: "BlueSpark MZ - Soluções Tecnológicas Inovadoras para Moçambique e além.",
  openGraph: {
    title: {
      default: "BlueSpark MZ",
      template: "%s | BlueSpark MZ",
    },
    description: "BlueSpark MZ - Soluções Tecnológicas Inovadoras para Moçambique e além.",
    url: "https://bluesparkmz.com",
    siteName: "BlueSpark MZ",
    images: [
      {
        url: "/smartmoz-preview.png", // Using one of the existing images as default
        width: 1200,
        height: 630,
        alt: "BlueSpark MZ Preview",
      },
    ],
    locale: "pt_MZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlueSpark MZ",
    description: "BlueSpark MZ - Soluções Tecnológicas Inovadoras.",
    images: ["/smartmoz-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
