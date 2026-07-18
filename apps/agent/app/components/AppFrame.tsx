"use client";

import { NewspaperShell, Masthead, Footer } from "@nx/newspaper";

type AppFrameProps = {
  children: React.ReactNode;
};

export function AppFrame({ children }: AppFrameProps) {
  return (
    <NewspaperShell>
      <Masthead
        title="NX Agent"
        strapline="Workbench · Chat · History · Settings"
        menuItems={[
          { href: "/", label: "Home" },
          { href: "/chat", label: "Chat" },
          { href: "/history", label: "History" },
          { href: "/settings", label: "Settings" },
        ]}
      />
      <main>{children}</main>
      <Footer />
    </NewspaperShell>
  );
}
