import type { Metadata, Viewport } from "next";
import "@nx/design-system/styles";
import "./globals.css";
import { AppFrame } from "./components/AppFrame";
import { RouteAnalytics } from "./components/RouteAnalytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agent.local";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NX Agent Frontend",
    template: "%s | NX Agent",
  },
  description: "Agent frontend with workbench, chat, history, and runtime settings in a resilient Next.js shell.",
  keywords: ["agent", "frontend", "nextjs", "nx", "workbench", "chat"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "NX Agent Frontend",
    description: "Production-minded frontend shell with agent workbench and operational routes.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "NX Agent Frontend",
    description: "A polished and resilient frontend for Agent workflows.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f7ff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="app-root">
        <RouteAnalytics />
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}