export const newspaperTokens = {
  color: {
    paper: "#ffffff",
    paperStrong: "#F8F8F8",
    ink: "#222222",
    inkMuted: "#02493C",
    line: "#d7d0c4",
    accent: "#085A4B",
    accentSoft: "#e7f2ef",
    success: "#085A4B",
    warning: "#8a5b00"
  },
  font: {
    serif: "\"Iowan Old Style\", \"Palatino Linotype\", Palatino, \"Book Antiqua\", serif",
    sans: "\"Source Sans 3\", \"Helvetica Neue\", Helvetica, sans-serif",
    mono: "\"IBM Plex Mono\", Menlo, Monaco, Consolas, monospace"
  },
  radius: {
    none: "0px",
    sm: "2px",
    md: "4px"
  },
  spacing: {
    xxs: "0.25rem",
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem"
  },
  shadow: {
    soft: "0 1px 0 rgba(0, 0, 0, 0.08)",
    card: "0 8px 24px rgba(0, 0, 0, 0.05)"
  },
  layout: {
    maxWidth: "1240px",
    gutter: "1rem"
  }
} as const;

export type NewspaperTokens = typeof newspaperTokens;
