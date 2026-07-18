import type { StoryMeta as StoryMetaType } from "../theme/types";

export interface StoryMetaProps {
  meta?: StoryMetaType;
}

export function StoryMeta({ meta }: StoryMetaProps) {
  if (!meta || (!meta.byline && !meta.publishedAt && !meta.readTime)) {
    return null;
  }

  return (
    <p className="np-story-meta">
      {meta.byline ? <span>{meta.byline}</span> : null}
      {meta.publishedAt ? <time dateTime={meta.publishedAt}>{meta.publishedAt}</time> : null}
      {meta.readTime ? <span>{meta.readTime}</span> : null}
    </p>
  );
}
