import { Eyebrow } from "./Eyebrow";

export default {
  title: "Brand/Eyebrow",
  component: Eyebrow,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["clay", "ink", "muted"],
    },
    as: {
      control: "radio",
      options: ["block", "inline"],
    },
  },
  args: {
    children: "Starter label",
    tone: "clay",
    as: "block",
  },
};

export const Default = {};

export const Inline = {
  args: {
    as: "inline",
    children: "Inline eyebrow",
  },
};
