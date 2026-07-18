import { TopBar } from "./TopBar";

export default {
  title: "Navigation/TopBar",
  component: TopBar,
  tags: ["autodocs"],
  args: {
    links: [
      { label: "Home", href: "#top" },
      { label: "Components", href: "#components" },
      { label: "Docs", href: "#docs" },
    ],
    cta: "Get started",
    logoHeight: 30,
  },
};

export const Default = {};

export const NoCta = {
  args: {
    cta: undefined,
  },
};
