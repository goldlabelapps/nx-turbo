import React from "react";
import { Card } from "./Card.jsx";
import { Tag } from "../feedback/Tag.jsx";

/**
 * An aftercare product card: photo on top, then a step eyebrow, serif name,
 * mono brand line, price and a quiet buy action. Lifts on hover.
 */
export function ProductCard({
  image,
  step,
  name,
  brand,
  price,
  tag,
  buyLabel = "Buy",
  onBuy,
  style,
  ...rest
}) {
  return (
    <Card variant="tile" padding="sm" hoverLift style={{ display: "flex", flexDirection: "column", position: "relative", ...style }} {...rest}>
      {tag ? (
        <div style={{ position: "absolute", top: "14px", left: "16px", zIndex: 2 }}>
          <Tag>{tag}</Tag>
        </div>
      ) : null}
      <div
        style={{
          background: "#fff",
          borderRadius: "var(--radius-lg)",
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {typeof image === "string" ? (
          <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          image || (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--nx-muted)" }}>
              Product photo
            </span>
          )
        )}
      </div>
      <div style={{ padding: "18px 8px 4px", display: "flex", flexDirection: "column", flex: 1 }}>
        {step ? (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--nx-clay)" }}>
            {step}
          </span>
        ) : null}
        <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.6rem", lineHeight: 1.05, color: "var(--nx-ink)", margin: "9px 0 4px" }}>
          {name}
        </span>
        {brand ? (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--nx-muted)" }}>
            {brand}
          </span>
        ) : null}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
          {price ? (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", color: "var(--nx-ink)" }}>{price}</span>
          ) : <span />}
          <button
            onClick={onBuy}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--nx-ink)",
              background: "transparent",
              border: "1px solid rgba(40,34,28,0.28)",
              borderRadius: "30px",
              padding: "9px 18px",
              cursor: "pointer",
            }}
          >
            {buyLabel}
          </button>
        </div>
      </div>
    </Card>
  );
}
