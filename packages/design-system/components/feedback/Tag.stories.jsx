import { Tag } from "./Tag";

export default {
  title: "Feedback/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["frost", "clay", "outline"],
    },
  },
  args: {
    children: "New",
    variant: "frost",
  },
};

export const Default = {};

export const Clay = {
  args: {
    variant: "clay",
  },
};

export const Outline = {
  args: {
    variant: "outline",
  },
};
