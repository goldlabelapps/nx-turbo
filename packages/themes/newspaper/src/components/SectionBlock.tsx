import type { ReactNode } from "react";
import type { LinkItem, SectionTone } from "../theme/types";

export interface SectionBlockProps {
  title: string;
  href?: string;
  tone?: SectionTone;
  actions?: LinkItem[];
  children: ReactNode;
}

export function SectionBlock({ title, href, tone = "default", actions = [], children }: SectionBlockProps) {
  return (
    <section className={`np-section-block np-section-block--${tone}`} aria-label={title}>
      <header className="np-section-head">
        <h2>{href ? <a href={href}>{title}</a> : title}</h2>
        {actions.length > 0 ? (
          <nav aria-label={`${title} actions`} className="np-section-actions">
            {actions.map((action) => (
              <a key={action.href} href={action.href}>
                {action.label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>
      <div className="np-section-content">{children}</div>
    </section>
  );
}
