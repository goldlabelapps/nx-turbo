import { StatCard } from "./StatCard";

export default {
  title: "Surfaces/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  args: {
    figure: "3×",
    children: "Faster onboarding for the new starter app.",
    source: "Internal benchmark",
  },
};

export const Default = {};

export const Glass = {
  args: {
    variant: "glass",
  },
};
