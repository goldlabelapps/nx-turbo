import React from "react";

/**
 * A hairline-divided disclosure list (FAQ / details). Each item has a
 * serif-italic or mono-caps summary and a rotating clay chevron.
 */
export function Accordion({ items, allowMultiple = false, summaryStyle = "serif", style }) {
  const [open, setOpen] = React.useState(() => new Set());
  const toggle = (i) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };
  const serif = summaryStyle === "serif";
  return (
    <div style={{ borderTop: "1px solid rgba(40,34,28,0.13)", ...style }}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} style={{ borderBottom: "1px solid rgba(40,34,28,0.13)" }}>
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                cursor: "pointer",
                border: 0,
                background: "transparent",
                textAlign: "left",
                padding: serif ? "22px 4px" : "16px 2px",
                fontFamily: serif ? "var(--font-serif)" : "var(--font-mono)",
                fontStyle: serif ? "italic" : "normal",
                fontSize: serif ? "1.22rem" : "0.72rem",
                letterSpacing: serif ? "0" : "0.06em",
                textTransform: serif ? "none" : "uppercase",
                color: "var(--nx-ink)",
              }}
            >
              {item.q}
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  flex: "0 0 auto",
                  borderRight: "1.5px solid var(--nx-clay)",
                  borderBottom: "1.5px solid var(--nx-clay)",
                  transform: isOpen ? "rotate(-135deg)" : "rotate(45deg)",
                  transition: "transform var(--dur-mid) var(--ease-out)",
                }}
              />
            </button>
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows var(--dur-mid) var(--ease-out)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    padding: "0 4px 24px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.95rem",
                    lineHeight: 1.62,
                    color: "var(--nx-body)",
                    maxWidth: "62ch",
                  }}
                >
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
