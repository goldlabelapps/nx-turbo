import React from "react";

/**
 * The NX logo lockup: favicon on the left with NX° on the right,
 * or favicon alone when `variant="mark"`.
 *
 * @startingPoint section="Brand" subtitle="NX logo lockup" viewport="360x120"
 */
export function Logo(props: LogoProps): JSX.Element;

export interface LogoProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Full wordmark or the sparkle mark alone. @default "full" */
  variant?: "full" | "mark";
  /** Rendered favicon height in px; lockup text scales from this. @default 40 */
  height?: number;
  /** Fill colour. @default "ink" */
  tone?: "ink" | "dusty" | "offwhite" | "current";
}
