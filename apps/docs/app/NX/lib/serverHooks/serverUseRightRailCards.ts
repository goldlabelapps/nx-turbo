import fs from "fs";
import matter from "gray-matter";
import { serverUseMDBySlug } from "./serverUseMDBySlug";

export type RightRailLink = {
  label: string;
  href: string;
};

export type RightRailCard = {
  label: string;
  href: string;
  image?: string;
  snippet: string;
};

function excerptMarkdown(content: string, maxLength = 220): string {
  const withoutCodeBlocks = content.replace(/```[\s\S]*?```/g, " ");
  const withoutShortcodes = withoutCodeBlocks
    .replace(/^\s*\[[A-Za-z][^\]]*\]\s*$/gm, " ")
    .replace(/\[[A-Za-z][^\]]*\]/g, " ");

  const normalized = withoutShortcodes
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .join("\n\n")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) {
    return "";
  }

  if (normalized.length <= maxLength) {
    return normalized;
  }

  const clipped = normalized.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  const safe = lastSpace > 40 ? clipped.slice(0, lastSpace) : clipped;
  return `${safe}...`;
}

function hrefToSlugArray(href: string): string[] {
  const cleaned = href
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/^\/+/, "")
    .replace(/\?.*$/, "")
    .replace(/#.*$/, "")
    .replace(/\/+$/, "");

  if (!cleaned) {
    return [];
  }

  return cleaned.split("/").filter(Boolean);
}

export function serverUseRightRailCards(links: RightRailLink[], maxCards = 6): RightRailCard[] {
  return links.slice(0, maxCards).map((link) => {
    const slugArr = hrefToSlugArray(link.href);
    const filePath = serverUseMDBySlug(slugArr);

    if (!filePath || !fs.existsSync(filePath)) {
      return {
        label: link.label,
        href: link.href,
        snippet: "",
      };
    }

    const md = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(md);

    return {
      label: link.label,
      href: link.href,
      image: typeof data.image === "string" && data.image.trim() ? data.image.trim() : undefined,
      snippet: excerptMarkdown(content),
    };
  });
}
