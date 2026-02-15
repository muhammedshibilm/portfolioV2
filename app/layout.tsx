import type { Metadata, Viewport } from "next";
import "./globals.css";
import Head from "next/head";
import SmoothScroll from "../components/SmoothScroll";

export const viewport: Viewport = {
  userScalable: false,
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Muhammed Shibil M - Software Engineer",
  description:
    "Passionate Software Engineer specializing in Next.js, FastAPI, and AI development.",
  manifest: "/manifest.json",
  authors: [
    { name: "Muhammed Shibil M", url: "https://muhammedshibilm.vercel.app" },
  ],
  keywords: [
    "Muhammed Shibil M",
    "Software Engineer",
    "Next.js Developer",
    "FastAPI Developer",
    "AI Developer",
    "Portfolio",
  ],
  category: "Technology",
  robots: "index, follow",
  openGraph: {
    title: "Muhammed Shibil M - Software Engineer",
    description:
      "Explore my portfolio showcasing my projects, skills, and achievements.",
    url: "https://muhammedshibilm.vercel.app",
    siteName: "Muhammed Shibil M",

    type: "website",
  },
  twitter: {
    creator: "@muhammedshibil_",
    title: "Muhammed Shibil M - Software Engineer",
    description:
      "Explore my portfolio showcasing my projects, skills, and achievements.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#262020" />
      </Head>
      <body className="mesh-gradient antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
