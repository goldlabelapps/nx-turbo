import "../styles.css";

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
        { name: "parchment", value: "#f6f2ea" },
        { name: "ink", value: "#1a1814" },
      ],
    },
  },
};

export default preview;
