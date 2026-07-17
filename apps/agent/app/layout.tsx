import type { Metadata } from "next";
import "@nx/design-system/styles";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent workspace",
  description: "A clean Next.js starter with the design system wired in from day one.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}