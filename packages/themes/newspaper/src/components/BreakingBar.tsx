import type { LinkItem } from "../theme/types";

export interface BreakingBarProps {
  label?: string;
  items: LinkItem[];
}

export function BreakingBar({ label = "Breaking", items }: BreakingBarProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside aria-label="Breaking stories" className="np-breaking-bar">
      <span className="np-breaking-label">{label}</span>
      <ul className="np-breaking-list">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
