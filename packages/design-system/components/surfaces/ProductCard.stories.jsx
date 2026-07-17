import { ProductCard } from "./ProductCard";

export default {
  title: "Surfaces/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  args: {
    image:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 440'><rect width='480' height='440' fill='%23f2e8de'/><rect x='60' y='56' width='360' height='328' rx='36' fill='%23ff5a1f'/><text x='240' y='232' text-anchor='middle' font-family='Arial' font-size='34' font-weight='700' fill='white'>PRODUCT</text></svg>",
    step: "Step 02 · Serum",
    name: "Barrier Repair Serum",
    brand: "NX°",
    price: "£38",
    tag: "New",
    buyLabel: "Buy now",
  },
};

export const Default = {};

export const NoTag = {
  args: {
    tag: undefined,
  },
};
