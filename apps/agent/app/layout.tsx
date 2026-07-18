import type { Metadata, Viewport } from "next";
import "@nx/design-system/styles";
import "./globals.css";
import { AppFrame } from "./components/AppFrame";
import { RouteAnalytics } from "./components/RouteAnalytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agent.local";
const configuredDesignSystem = process.env.NEXT_PUBLIC_DESIGN_SYSTEM;
const designSystemId = configuredDesignSystem?.trim() || "nx";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.webmanifest",
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
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
    <html lang="en" data-design-system={designSystemId}>
      <body className="app-root">
        <RouteAnalytics />
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}