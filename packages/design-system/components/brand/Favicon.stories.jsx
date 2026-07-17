import { Favicon } from "./Favicon";

export default {
  title: "Brand/Favicon",
  component: Favicon,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: {
        type: "select",
        labels: {
          clay: "secondary",
        },
      },
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

export const Secondary = {
  args: {
    tone: "clay",
  },
};
