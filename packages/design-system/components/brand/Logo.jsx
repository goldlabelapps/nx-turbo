import React from "react";

const TONES = {
  ink: "#1a1814",
  dusty: "#2c2c2a",
  offwhite: "#f7f7f4",
  current: "currentColor",
};

const PLACEHOLDER_FILL = "#FF5A1F";
const PLACEHOLDER_STROKE = "#1B1F24";

/**
 * Temporary logo placeholder renderer. This intentionally avoids shipping
 * any legacy brand vectors while replacement assets are pending.
 */
export function Logo({ variant = "full", height = 40, tone = "ink", style, ...rest }) {
  const stroke = TONES[tone] || tone;
  const isMark = variant === "mark";
  const viewBox = isMark ? "0 0 256 256" : "0 0 320 96";
  const ratio = isMark ? 1 : 320 / 96;
  return (
    <svg
      viewBox={viewBox}
      height={height}
      width={height * ratio}
      role="img"
      aria-label="NX placeholder logo"
      style={{ display: "block", ...style }}
      {...rest}
    >
      {isMark ? (
        <>
          <rect
            x="12"
            y="12"
            width="232"
            height="232"
            rx="28"
            fill={PLACEHOLDER_FILL}
            stroke={PLACEHOLDER_STROKE}
            strokeWidth="12"
          />
          <rect
            x="44"
            y="44"
            width="168"
            height="168"
            rx="16"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeDasharray="12 10"
          />
          <text
            x="128"
            y="136"
            textAnchor="middle"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="22"
            fontWeight="700"
            fill="#FFFFFF"
            letterSpacing="1"
          >
            REPLACE ME
          </text>
        </>
      ) : (
        <>
          <rect
            x="4"
            y="4"
            width="312"
            height="88"
            rx="14"
            fill={PLACEHOLDER_FILL}
            stroke={stroke}
            strokeWidth="8"
          />
          <rect
            x="24"
            y="24"
            width="272"
            height="48"
            rx="8"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeDasharray="10 8"
          />
          <text
            x="160"
            y="56"
            textAnchor="middle"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="20"
            fontWeight="700"
            fill="#FFFFFF"
            letterSpacing="1"
          >
            REPLACE ME
          </text>
        </>
      )}
    </svg>
  );
}
