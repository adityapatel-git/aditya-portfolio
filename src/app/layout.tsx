import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Aditya Patel - Software Engineer",
  description:
    "Software engineer focused on scalable backend systems, cloud-native applications, and modern web technologies.",
};

const themeScript = `
(function () {
  try {
    const saved = localStorage.getItem("theme");

    if (saved === "light" || saved === "dark") {
      document.documentElement.dataset.theme = saved;
      return;
    }

    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    document.documentElement.dataset.theme =
      prefersLight ? "light" : "dark";
  } catch {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>

      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}