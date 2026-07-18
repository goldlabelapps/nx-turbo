import React from "react";

/**
 * A rounded (pill) text input on soft paper. Optional leading label and
 * helper/error text below.
 */
export function Input({
  label,
  hint,
  error,
  id,
  style,
  wrapStyle,
  ...rest
}) {
  const autoId = React.useId();
  const inputId = id || autoId;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "7px", ...wrapStyle }}>
      {label ? (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--nx-muted)",
          }}
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.95rem",
          color: "var(--nx-ink)",
          padding: "14px 18px",
          borderRadius: "var(--radius-pill)",
          border: `1px solid ${error ? "var(--nx-clay)" : "var(--nx-line)"}`,
          background: "rgba(251,250,247,0.92)",
          outline: "none",
          transition: "border-color var(--dur-fast)",
          ...style,
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--nx-clay)")}
        onBlur={(e) => (e.target.style.borderColor = error ? "var(--nx-clay)" : "var(--nx-line)")}
        {...rest}
      />
      {hint || error ? (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.04em",
            color: error ? "var(--nx-clay)" : "var(--nx-muted)",
            paddingLeft: "4px",
          }}
        >
          {error || hint}
        </span>
      ) : null}
    </div>
  );
}
