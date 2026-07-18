import type { LinkItem } from "../theme/types";

export interface MastheadProps {
  title: string;
  strapline?: string;
  sections?: Array<string | LinkItem>;
  utilityLinks?: LinkItem[];
}

function renderSection(item: string | LinkItem, index: number) {
  if (typeof item === "string") {
    return (
      <li key={item + index}>
        <span className="np-masthead-section-link">{item}</span>
      </li>
    );
  }

  return (
    <li key={item.href + index}>
      <a className="np-masthead-section-link" href={item.href}>
        {item.label}
      </a>
    </li>
  );
}

export function Masthead({ title, strapline, sections = [], utilityLinks = [] }: MastheadProps) {
  return (
    <header className="np-masthead" role="banner">
      <div className="np-masthead-top-row">
        <p className="np-masthead-dateline">Daily Edition</p>
        {utilityLinks.length > 0 ? (
          <nav aria-label="Utility" className="np-masthead-utility-nav">
            {utilityLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>

      <h1 className="np-masthead-title">{title}</h1>
      {strapline ? <p className="np-masthead-strapline">{strapline}</p> : null}

      {sections.length > 0 ? (
        <nav aria-label="Sections" className="np-section-nav">
          <ul>{sections.map(renderSection)}</ul>
        </nav>
      ) : null}
    </header>
  );
}
