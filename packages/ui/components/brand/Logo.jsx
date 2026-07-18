import React from "react";
import { Favicon } from "./Favicon.jsx";

const TONES = {
  ink: "#0b1020",
  dusty: "#1a2340",
  offwhite: "#f4f7ff",
  current: "currentColor",
};

/**
 * Minimal NX lockup: favicon on the left and NX° wordmark on the right.
 */
export function Logo({ variant = "full", height = 40, tone = "ink", style, ...rest }) {
  const color = TONES[tone] || tone;
  const isMark = variant === "mark";

  if (isMark) {
    return (
      <Favicon
        size={height}
        tone={tone === "current" ? "current" : tone}
        title="NX mark"
        style={{ display: "block", color, ...style }}
        {...rest}
      />
    );
  }

  const wordSize = Math.max(14, Math.round(height * 0.58));

  return (
    <span
      role="img"
      aria-label="NX logo"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: Math.max(6, Math.round(height * 0.2)),
        color,
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      <Favicon size={height} tone={tone === "current" ? "current" : tone} aria-hidden />
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 800,
          fontSize: `${wordSize}px`,
          letterSpacing: "0.03em",
          color,
        }}
      >
        NX°
      </span>
    </span>
  );
}
