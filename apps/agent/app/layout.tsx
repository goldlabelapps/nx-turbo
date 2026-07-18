import type { Metadata, Viewport } from "next";
import "@nx/unix/styles";
import "./globals.css";
import { AppFrame } from "./components/AppFrame";
import { RouteAnalytics } from "./components/RouteAnalytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agent.local";
const configuredDesignSystem = process.env.NEXT_PUBLIC_DESIGN_SYSTEM;
const designSystemId = configuredDesignSystem?.trim() || "unix";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.webmanifest",
  title: {
    default: "NX Agent",
    template: "%s | NX Agent",
  },
  description: "Agent frontend with workbench, chat, history, and runtime settings in a resilient Next.js shell.",
  keywords: ["agent", "frontend", "nextjs", "nx", "workbench", "chat"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "NX Agent",
    description: "Production-minded frontend shell with agent workbench and operational routes.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "NX Agent",
    description: "A polished and resilient frontend for Agent workflows.",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#edf8f0",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-design-system={designSystemId}>
      <body>
        <div className="wrapper">
          <RouteAnalytics />
          <AppFrame>{children}</AppFrame>
        </div>
      </body>
    </html>
  );
}