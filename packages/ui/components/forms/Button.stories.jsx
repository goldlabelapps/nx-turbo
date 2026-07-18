import { Button } from "./Button";

export default {
  title: "Forms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "ghost", "quiet"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
    block: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    children: "Get Started",
    variant: "primary",
    size: "md",
    block: false,
    disabled: false,
  },
};

export const Primary = {};

export const Ghost = {
  args: {
    variant: "ghost",
  },
};

export const Quiet = {
  args: {
    variant: "quiet",
  },
};

export const Block = {
  args: {
    block: true,
    children: "Continue",
  },
};
