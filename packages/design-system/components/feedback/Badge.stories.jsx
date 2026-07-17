import { Badge } from "./Badge";

export default {
  title: "Feedback/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: {
        type: "select",
        labels: {
          clay: "secondary",
        },
      },
      options: ["ink", "clay"],
    },
  },
  args: {
    children: "Most popular",
    tone: "ink",
  },
};

export const Default = {};

export const Secondary = {
  args: {
    tone: "clay",
  },
};
