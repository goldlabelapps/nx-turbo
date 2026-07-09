import React from "react";

/**
 * An aftercare product card - photo, step eyebrow, serif name, brand, price
 * and a quiet buy action.
 *
 * @startingPoint section="Surfaces" subtitle="Aftercare product card" viewport="340x400"
 */
export function ProductCard(props: ProductCardProps): JSX.Element;

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL, or your own node (e.g. an <image-slot>). */
  image?: string | React.ReactNode;
  /** Step eyebrow, e.g. "Step 02 · Serum". */
  step?: React.ReactNode;
  /** Product name (serif italic). */
  name: React.ReactNode;
  /** Brand line (mono caps). */
  brand?: React.ReactNode;
  /** Price string, e.g. "£38". */
  price?: React.ReactNode;
  /** Corner tag, e.g. "New". */
  tag?: React.ReactNode;
  /** Buy button label. @default "Buy" */
  buyLabel?: React.ReactNode;
  onBuy?: () => void;
}
