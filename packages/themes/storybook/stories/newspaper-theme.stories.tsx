import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  BreakingBar,
  LeadStoryCard,
  Masthead,
  NewspaperShell,
  StoryCard,
  StoryGrid,
} from "../../newspaper/src";

const meta = {
  title: "Themes/Newspaper Showcase",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FrontPage: Story = {
  globals: {
    theme: "newspaper",
  },
  render: () => (
    <NewspaperShell>
      <Masthead
        title="The Daily NX"
        strapline="Theme preview for editorial content"
        sections={[
          { label: "World", href: "#" },
          { label: "Product", href: "#" },
          { label: "Culture", href: "#" },
        ]}
      />

      <BreakingBar
        items={[
          { label: "Release candidate ships this afternoon", href: "#" },
          { label: "Design tokens updated across packages", href: "#" },
        ]}
      />

      <StoryGrid
        lead={
          <LeadStoryCard
            eyebrow="Lead"
            title="Two active themes now share one Storybook"
            dek="Newspaper and Unix previews are both available from a central host package."
            meta={{ byline: "Editorial Desk", publishedAt: "Today", readTime: "4 min" }}
            media={<div style={{ height: 220, background: "#d7d0c4" }} />}
          />
        }
        stories={[
          <StoryCard
            key="story-1"
            eyebrow="Toolkit"
            title="Theme registry controls the toolbar"
            dek="Add one object to register a new theme in Storybook."
            meta={{ byline: "Platform", readTime: "2 min" }}
          />,
          <StoryCard
            key="story-2"
            eyebrow="Workflow"
            title="Showcases live under themes/storybook"
            dek="Keep theme previews decoupled from application pages."
            meta={{ byline: "Docs", readTime: "3 min" }}
            tone="muted"
          />,
        ]}
      />
    </NewspaperShell>
  ),
};
