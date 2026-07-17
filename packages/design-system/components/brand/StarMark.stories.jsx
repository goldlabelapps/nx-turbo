import { StarMark } from "./StarMark";

export default {
  title: "Brand/StarMark",
  component: StarMark,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["ink", "dusty", "clay", "offwhite", "current"],
    },
    size: {
      control: { type: "number", min: 12, max: 128, step: 2 },
    },
  },
  args: {
    size: 48,
    tone: "ink",
    title: "NX sparkle mark",
  },
};

export const Default = {};

export const Clay = {
  args: {
    tone: "clay",
  },
};
