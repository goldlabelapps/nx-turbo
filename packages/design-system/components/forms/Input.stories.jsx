import { Input } from "./Input";

export default {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "Email",
    hint: "We’ll only use this for account updates.",
    placeholder: "you@example.com",
  },
};

export const Default = {};

export const Error = {
  args: {
    error: "Please enter a valid email address.",
    hint: undefined,
  },
};
