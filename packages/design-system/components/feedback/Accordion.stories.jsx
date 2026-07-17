import { Accordion } from "./Accordion";

const items = [
  {
    q: "What is included?",
    a: "A lightweight starter shell, a clean landing page, and shared design-system components.",
  },
  {
    q: "Can I extend it?",
    a: "Yes. It is set up as a simple Next app so you can add routes, data fetching, and layouts as needed.",
  },
  {
    q: "Is the design system wired in?",
    a: "Yes. The app imports the design-system styles and components directly from the workspace package.",
  },
];

export default {
  title: "Feedback/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: {
    items,
  },
};

export const Default = {};

export const MonoSummary = {
  args: {
    summaryStyle: "mono",
  },
};
