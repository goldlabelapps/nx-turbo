"use client";

import Link from "next/link";

type AppFrameProps = {
  children: React.ReactNode;
};

export function AppFrame({ children }: AppFrameProps) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__content">
          <div className="terminal-chrome" aria-hidden="true">
            <span className="terminal-dot terminal-dot--close" />
            <span className="terminal-dot terminal-dot--warn" />
            <span className="terminal-dot terminal-dot--ok" />
            <span className="terminal-path">/srv/nx/agent</span>
          </div>

          <div className="terminal-brand-row">
            <Link className="brand" href="/" aria-label="NX Agent home">
              <span className="brand-copy">
                <span className="brand-kicker">NX Runtime</span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="site-footer__content">
          <span>NX Agent</span>
          <span>Unix Theme Surface</span>
        </div>
      </footer>
    </div>
  );
}
