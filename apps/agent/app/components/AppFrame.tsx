"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@nx/unix";

type AppFrameProps = {
  children: React.ReactNode;
};

const links = [
  { href: "/", label: "Home" },
];

export function AppFrame({ children }: AppFrameProps) {
  const pathname = usePathname();

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <div className="site-header__content">
          <div className="terminal-chrome" aria-hidden>
            <span className="terminal-dot terminal-dot--close" />
            <span className="terminal-dot terminal-dot--warn" />
            <span className="terminal-dot terminal-dot--ok" />
            <span className="terminal-path">/usr/local/agent-console</span>
          </div>

          <div className="terminal-brand-row">
            <Link href="/" className="brand" aria-label="Go to home">
              <Logo height={30} />
              <span className="brand-copy" aria-hidden>
                <span className="brand-kicker">Agentic Terminal</span>
                <span className="brand-title">nx-agent.runtime</span>
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
          </div>

          <div className="site-header__actions">
            <p className="terminal-status">
              <span className="mono-label">status</span> online
            </p>
          </div>
        </div>
      </header>

      <main className="site-main">
        {children}
        <span className="neon-cursor" aria-hidden />
      </main>

      <footer className="site-footer">
        <p>ready. enter a prompt.</p>
      </footer>
    </div>
  );
}
