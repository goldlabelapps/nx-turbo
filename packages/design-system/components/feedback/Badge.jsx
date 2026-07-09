import React from "react";

const TONES = {
  ink: { background: "var(--leida-ink)", color: "var(--leida-parchment)" },
  clay: { background: "var(--leida-clay)", color: "var(--leida-parchment)" },
};

/**
 * A small filled mono-caps pill for status / emphasis - e.g. "MOST POPULAR"
 * on a pricing tier, or "NEW" beside a heading.
 */
export function Badge({ children, tone = "ink", style, ...rest }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-mono)",
        fontSize: "0.58rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "5px 12px",
        borderRadius: "var(--radius-pill)",
        lineHeight: 1,
        ...(TONES[tone] || TONES.ink),
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
