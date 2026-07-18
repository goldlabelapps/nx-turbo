export const newspaperTokens = {
  color: {
    paper: "#f8f6f0",
    paperStrong: "#f2efe6",
    ink: "#151515",
    inkMuted: "#5a5a5a",
    line: "#d7d0c4",
    accent: "#9b1d20",
    accentSoft: "#efe1df",
    success: "#1f5b3d",
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
