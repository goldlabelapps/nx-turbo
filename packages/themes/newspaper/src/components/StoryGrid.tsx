import type { ReactNode } from "react";

export interface StoryGridProps {
  lead: ReactNode;
  sideRail?: ReactNode;
  stories?: ReactNode[];
}

export function StoryGrid({ lead, sideRail, stories = [] }: StoryGridProps) {
  return (
    <section className="np-story-grid" aria-label="Top stories">
      <div className="np-story-grid-lead">{lead}</div>

      {stories.length > 0 ? (
        <div className="np-story-grid-stack">{stories.map((story, index) => <div key={index}>{story}</div>)}</div>
      ) : null}

      {sideRail ? <aside className="np-story-grid-rail">{sideRail}</aside> : null}
    </section>
  );
}
