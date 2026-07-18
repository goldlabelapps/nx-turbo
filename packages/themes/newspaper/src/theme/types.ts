import type { ReactNode } from "react";

export type SectionTone = "default" | "accent" | "muted";

export interface StoryMeta {
  byline?: string;
  publishedAt?: string;
  readTime?: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface MastheadMenuItem {
  label: string;
  href: string;
  children?: MastheadMenuItem[];
}

export interface BaseCardProps {
  eyebrow?: string;
  title: string;
  dek?: string;
  href?: string;
  meta?: StoryMeta;
  tone?: SectionTone;
  media?: ReactNode;
}
