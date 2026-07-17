"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Logo } from "@nx/design-system";

type AppFrameProps = {
  children: React.ReactNode;
};

const links = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Chat" },
  { href: "/history", label: "History" },
  { href: "/settings", label: "Settings" },
  { href: "/Agent", label: "Workbench" },
];

export function AppFrame({ children }: AppFrameProps) {
  const pathname = usePathname();

  return (
    <div className="app-shell" id="top">
      <header className="site-header">
        <div className="site-header__content">
          <Link href="/" className="brand" aria-label="Go to home">
            <Logo height={34} />
            <span className="brand-copy" aria-hidden>
              <span className="brand-kicker">Agent</span>
              <span className="brand-title">Frontend Console</span>
            </span>
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {links.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-nav__link${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="site-header__actions">
            <Button as={Link} href="/Agent" size="sm">
              Start Session
            </Button>
          </div>
        </div>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <p>NX Agent frontend with typed routes, resilient states, and analytics-ready hooks.</p>
      </footer>
    </div>
  );
}
