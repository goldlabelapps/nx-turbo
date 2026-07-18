import { Tag } from "./Tag";

export default {
  title: "Feedback/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
        labels: {
          clay: "secondary",
        },
      },
      options: ["frost", "clay", "outline"],
    },
  },
  args: {
    children: "New",
    variant: "frost",
  },
};

export const Default = {};

export const Secondary = {
  args: {
    variant: "clay",
  },
};

export const Outline = {
  args: {
    variant: "outline",
  },
};
