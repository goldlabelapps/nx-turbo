import { Card } from "./Card";

export default {
  title: "Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["paper", "glass", "tile", "ink"],
    },
    padding: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    hoverLift: {
      control: "boolean",
    },
  },
  args: {
    variant: "paper",
    padding: "lg",
    hoverLift: true,
    children: "Card content goes here.",
  },
};

export const Default = {};

export const Ink = {
  args: {
    variant: "ink",
  },
};
