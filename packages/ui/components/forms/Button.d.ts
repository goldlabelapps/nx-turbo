import React from "react";

/**
 * The NX pill button - mono, uppercase, wide-tracked, lifts on hover.
 *
 * @startingPoint section="Forms" subtitle="Pill button - primary / ghost / quiet" viewport="360x120"
 */
export function Button(props: ButtonProps): JSX.Element;

type ButtonSharedProps = {
  /** Label. */
  children: React.ReactNode;
  /** Visual weight. @default "primary" */
  variant?: "primary" | "ghost" | "quiet";
  /** Size. @default "md" */
  size?: "sm" | "md";
  /** Stretch to full width. @default false */
  block?: boolean;
  /** Optional leading icon node. */
  icon?: React.ReactNode;
  /** Render as another element, e.g. "a". @default "button" */
  as?: "button" | "a";
  disabled?: boolean;
};

export type ButtonProps =
  | (ButtonSharedProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" })
  | (ButtonSharedProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" });
