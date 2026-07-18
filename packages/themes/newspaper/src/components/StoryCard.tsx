import type { BaseCardProps } from "../theme/types";
import { StoryMeta } from "./StoryMeta";

export interface StoryCardProps extends BaseCardProps {
  compact?: boolean;
}

export function StoryCard({
  eyebrow,
  title,
  dek,
  href,
  meta,
  tone = "default",
  media,
  compact = false
}: StoryCardProps) {
  const classes = [
    "np-story-card",
    compact ? "np-story-card--compact" : "np-story-card--standard",
    `np-story-card--${tone}`
  ].join(" ");

  return (
    <article className={classes}>
      {media ? <div className="np-story-media">{media}</div> : null}
      <div className="np-story-body">
        {eyebrow ? <p className="np-story-eyebrow">{eyebrow}</p> : null}
        <h3 className="np-story-title">{href ? <a href={href}>{title}</a> : title}</h3>
        {dek ? <p className="np-story-dek">{dek}</p> : null}
        <StoryMeta meta={meta} />
      </div>
    </article>
  );
}
