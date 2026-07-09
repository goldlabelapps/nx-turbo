import React from "react";

const TONES = {
  clay: "var(--nx-clay)",
  ink: "var(--nx-ink)",
  muted: "var(--nx-muted)",
};

/**
 * A mono, all-caps, wide-tracked label - NX's signature "eyebrow".
 */
export function Eyebrow({ children, tone = "clay", as = "block", style, ...rest }) {
  return (
    <span
      style={{
        display: as === "inline" ? "inline-block" : "block",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--type-eyebrow)",
        letterSpacing: "var(--track-eyebrow)",
        textTransform: "uppercase",
        color: TONES[tone] || TONES.clay,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
