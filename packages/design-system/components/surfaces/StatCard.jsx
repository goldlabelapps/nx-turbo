import React from "react";
import { Card } from "./Card.jsx";

/**
 * A statement stat: a big serif-italic figure, a line of supporting copy
 * with the key figure underlined in clay, and an optional source label.
 */
export function StatCard({ figure, children, source, variant = "paper", style, ...rest }) {
  return (
    <Card variant={variant} padding="lg" style={{ textAlign: "left", ...style }} {...rest}>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "clamp(2.2rem, 5vw, 3rem)",
          lineHeight: 1,
          color: "var(--nx-ink)",
          marginBottom: "12px",
        }}
      >
        {figure}
      </div>
      {children ? (
        <p style={{ fontSize: "1.12rem", lineHeight: 1.5, margin: "0 0 14px", color: "var(--nx-ink)" }}>{children}</p>
      ) : null}
      {source ? (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--nx-muted)" }}>
          {source}
        </span>
      ) : null}
    </Card>
  );
}
