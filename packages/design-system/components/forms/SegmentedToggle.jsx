import React from "react";

/**
 * A frosted segmented control - a white pill holding 2–3 options, with the
 * active option filled ink. As used for the Morning / Evening routine toggle.
 */
export function SegmentedToggle({ options, value, onChange, style, ...rest }) {
  const [internal, setInternal] = React.useState(value ?? options[0]?.value);
  const active = value ?? internal;
  const pick = (v) => {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  };
  return (
    <div
      style={{
        display: "inline-flex",
        gap: "4px",
        padding: "5px",
        borderRadius: "40px",
        background: "rgba(255,255,255,0.78)",
        border: "1px solid var(--nx-line)",
        boxShadow: "0 8px 30px rgba(40,34,28,0.10)",
        ...style,
      }}
      role="tablist"
      {...rest}
    >
      {options.map((opt) => {
        const on = opt.value === active;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={on}
            onClick={() => pick(opt.value)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              border: 0,
              cursor: "pointer",
              padding: "9px 20px",
              borderRadius: "30px",
              transition: "all var(--dur-mid) var(--ease-out)",
              background: on ? "var(--nx-ink)" : "transparent",
              color: on ? "var(--nx-parchment)" : "var(--nx-body)",
            }}
          >
            {opt.icon ? <span style={{ display: "inline-flex", lineHeight: 0 }}>{opt.icon}</span> : null}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
