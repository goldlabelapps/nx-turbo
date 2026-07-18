import type { BaseCardProps } from "../theme/types";
import { StoryMeta } from "./StoryMeta";

export interface LeadStoryCardProps extends BaseCardProps {}

export function LeadStoryCard({
  eyebrow,
  title,
  dek,
  href,
  meta,
  tone = "default",
  media
}: LeadStoryCardProps) {
  const classes = ["np-story-card", "np-story-card--lead", `np-story-card--${tone}`].join(" ");

  return (
    <article className={classes}>
      {media ? <div className="np-story-media">{media}</div> : null}
      <div className="np-story-body">
        {eyebrow ? <p className="np-story-eyebrow">{eyebrow}</p> : null}
        <h2 className="np-story-title">{href ? <a href={href}>{title}</a> : title}</h2>
        {dek ? <p className="np-story-dek">{dek}</p> : null}
        <StoryMeta meta={meta} />
      </div>
    </article>
  );
}
