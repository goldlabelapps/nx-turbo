"use client";

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
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
