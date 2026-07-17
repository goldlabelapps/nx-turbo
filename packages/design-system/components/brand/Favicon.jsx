import React from "react";

const BALL_PATH =
  "M11.9316955,0.00778516743 C18.2793961,0.234625 23.2318292,5.339499 22.9916183,11.4103978 C22.7565183,17.4812966 17.4207699,22.2190224 11.0730694,21.9921826 C4.72536881,21.7653428 -0.227064254,16.6604688 0.00803576687,10.58957 C0.248246659,4.51867123 5.58399495,-0.218565786 11.9316955,0.00778516743 Z";

const SMILE_PATH =
  "M8,12 C12.6203742,21.9973959 20,13.9133228 20,13.9133228 C14.7209979,15.4126605 8,12 8,12 Z";

const TONES = {
  ink: "#0b1020",
  dusty: "#1a2340",
  clay: "#ff4d00",
  offwhite: "#f4f7ff",
  current: "currentColor",
};

/**
 * Ping-pong ball icon used as the NX brand mark variant.
 */
export function Favicon({ size = 24, tone = "ink", title, style, ...rest }) {
  const mainColor = TONES[tone] || tone;
  const smileColor = tone === "offwhite" ? "#0b1020" : "#fff";
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={{ display: "block", flex: "0 0 auto", ...style }}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <g stroke="none" fill="none" fillRule="evenodd">
        <g>
          <rect fillOpacity="0" x="0" y="0" width="24" height="24" />
          <g transform="translate(1, 1)" fillRule="nonzero">
            <path d={BALL_PATH} fill={mainColor} />
            <path d={SMILE_PATH} fill={smileColor} />
          </g>
        </g>
      </g>
    </svg>
  );
}
