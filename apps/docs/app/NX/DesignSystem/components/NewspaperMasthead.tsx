type LinkItem = {
  label: string;
  href: string;
};

export interface NewspaperMastheadMenuItem {
  label: string;
  href: string;
  children?: NewspaperMastheadMenuItem[];
}

export interface NewspaperMastheadProps {
  title: string;
  strapline?: string;
  sections?: Array<string | LinkItem>;
  menuItems?: NewspaperMastheadMenuItem[];
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

function renderNestedLinks(items: NewspaperMastheadMenuItem[], depth: number) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={`np-dropdown-list np-dropdown-list--depth-${depth}`}>
      {items.map((item, index) => (
        <li key={`${item.href}-${item.label}-${depth}-${index}`}>
          <a href={item.href}>{item.label}</a>
          {item.children && item.children.length > 0 ? renderNestedLinks(item.children, depth + 1) : null}
        </li>
      ))}
    </ul>
  );
}

function renderDesktopMenu(items: NewspaperMastheadMenuItem[]) {
  return (
    <nav aria-label="Sections" className="np-section-nav np-desktop-menu">
      <ul className="np-desktop-menu-root">
        {items.map((item, index) => (
          <li key={`${item.href}-${item.label}-${index}`} className="np-desktop-menu-item">
            <a className="np-masthead-section-link" href={item.href}>
              {item.label}
            </a>

            {item.children && item.children.length > 0 ? (
              <div className="np-dropdown-panel" role="group" aria-label={`${item.label} menu`}>
                <div className="np-dropdown-grid">
                  {item.children.map((child, childIndex) => (
                    <section key={`${child.href}-${child.label}-${childIndex}`} className="np-dropdown-column">
                      <a className="np-dropdown-column-title" href={child.href}>
                        {child.label}
                      </a>
                      {child.children && child.children.length > 0 ? renderNestedLinks(child.children, 1) : null}
                    </section>
                  ))}
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function NewspaperMasthead({
  title,
  strapline,
  sections = [],
  menuItems = [],
  utilityLinks = [],
}: NewspaperMastheadProps) {
  return (
    <header className="np-masthead" role="banner">
      <div className="np-masthead-top-row">
        <p className="np-masthead-dateline">Newspaper</p>
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

      {menuItems.length > 0 ? renderDesktopMenu(menuItems) : null}

      {menuItems.length === 0 && sections.length > 0 ? (
        <nav aria-label="Sections" className="np-section-nav">
          <ul>{sections.map(renderSection)}</ul>
        </nav>
      ) : null}
    </header>
  );
}
