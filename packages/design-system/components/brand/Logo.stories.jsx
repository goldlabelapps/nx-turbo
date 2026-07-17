import { Logo } from "./Logo";

export default {
  title: "Brand/Logo",
  component: Logo,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["full", "mark"],
    },
    tone: {
      control: "select",
      options: ["ink", "dusty", "offwhite", "current"],
    },
    height: {
      control: { type: "number", min: 24, max: 240, step: 4 },
    },
  },
  args: {
    variant: "full",
    tone: "ink",
    height: 56,
  },
};

export const Wordmark = {};

export const Mark = {
  args: {
    variant: "mark",
    height: 72,
  },
};

export const LightTone = {
  parameters: {
    backgrounds: { default: "ink" },
  },
  args: {
    tone: "offwhite",
  },
};
