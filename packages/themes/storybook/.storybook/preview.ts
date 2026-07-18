import "@nx/design-system/styles";

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      default: "parchment",
      values: [
        { name: "parchment", value: "#f4f7ff" },
        { name: "ink", value: "#0b1020" },
      ],
    },
  },
};

export default preview;
