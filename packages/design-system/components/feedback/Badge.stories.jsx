import { Badge } from "./Badge";

export default {
  title: "Feedback/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["ink", "clay"],
    },
  },
  args: {
    children: "Most popular",
    tone: "ink",
  },
};

export const Default = {};

export const Clay = {
  args: {
    tone: "clay",
  },
};
