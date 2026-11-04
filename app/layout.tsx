import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import Providers from "./providers";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteDescription =
  "BlueSpark MZ é uma empresa moçambicana de tecnologia. Conheça o BlueSpark Cloud — hospedagem de apps, APIs e automação WhatsApp com deploy em segundos — e os nossos produtos como o SkyVenda MZ.";

export const metadata: Metadata = {
  title: {
    default: "BlueSpark MZ — Tecnologia e BlueSpark Cloud",
    template: "%s | BlueSpark MZ",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  description: siteDescription,
  keywords: [
    "BlueSpark MZ",
    "BlueSpark Cloud",
    "Hospedagem de apps",
    "Deploy Moçambique",
    "Gateway WhatsApp",
    "Startup Moçambique",
    "Desenvolvimento de Software",
    "SkyVenda MZ",
    "Tecnologia Moçambique",
    "Niassa",
  ],
  openGraph: {
    title: {
      default: "BlueSpark MZ — Tecnologia e BlueSpark Cloud",
      template: "%s | BlueSpark MZ",
    },
    description: siteDescription,
    url: "https://bluesparkmz.com",
    siteName: "BlueSpark MZ",
    images: [
      {
        url: "/smartmoz-preview.png",
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
    title: "BlueSpark MZ — Tecnologia e BlueSpark Cloud",
    description:
      "BlueSpark MZ - Tecnologia moçambicana. Conheça o BlueSpark Cloud: deploy de apps, APIs e WhatsApp.",
    images: ["/smartmoz-preview.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${jakarta.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
