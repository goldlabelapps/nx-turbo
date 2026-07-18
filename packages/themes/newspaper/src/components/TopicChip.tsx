import type { SectionTone } from "../theme/types";

export interface TopicChipProps {
  label: string;
  href?: string;
  tone?: SectionTone;
}

export function TopicChip({ label, href, tone = "default" }: TopicChipProps) {
  const className = `np-topic-chip np-topic-chip--${tone}`;

  if (href) {
    return (
      <a className={className} href={href}>
        {label}
      </a>
    );
  }

  return <span className={className}>{label}</span>;
}
