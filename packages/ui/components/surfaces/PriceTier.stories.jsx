import { PriceTier } from "./PriceTier";

const features = [
  "One branded aftercare page per client",
  "Design system components ready to use",
  "Simple content and layout primitives",
];

export default {
  title: "Surfaces/PriceTier",
  component: PriceTier,
  tags: ["autodocs"],
  args: {
    name: "Solo",
    price: "£29",
    cadence: "/mo",
    description: "A simple plan for a single studio or independent therapist.",
    features,
    cta: "Start now",
    badge: undefined,
    featured: false,
  },
};

export const Default = {};

export const Featured = {
  args: {
    featured: true,
    badge: "Most popular",
    name: "Studio",
    price: "£59",
  },
};
