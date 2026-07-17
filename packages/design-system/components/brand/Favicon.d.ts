import React from "react";

/**
 * NX ping-pong ball brand mark.
 */
export function Favicon(props: FaviconProps): JSX.Element;

export interface FaviconProps extends Omit<React.SVGAttributes<SVGSVGElement>, "size"> {
  /** Square size in px. @default 24 */
  size?: number;
  /** Fill colour. @default "ink" */
  tone?: "ink" | "dusty" | "clay" | "offwhite" | "current";
  /** Accessible label; when omitted the mark is decorative. */
  title?: string;
}
