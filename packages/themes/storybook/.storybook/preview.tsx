import type { Preview } from "@storybook/react";
import React from "react";
import "@nx/ui/styles";
import "@nx/newspaper/styles";
import "@nx/oldfashioned/styles";
import "@nx/unix/styles";
import "./preview.css";
import { defaultThemeId, themeRegistry } from "./themes";

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const selectedTheme =
        themeRegistry.find((theme) => theme.id === context.globals.theme) ||
        themeRegistry.find((theme) => theme.id === defaultThemeId) ||
        themeRegistry[0];

      if (typeof document !== "undefined" && selectedTheme) {
        document.documentElement.setAttribute("data-design-system", selectedTheme.designSystem);
      }

      return (
        <div className={`sb-theme-frame sb-theme-${selectedTheme?.id || defaultThemeId}`}>
          <Story />
        </div>
      );
    },
  ],
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Active UI theme",
      defaultValue: defaultThemeId,
      toolbar: {
        icon: "paintbrush",
        items: themeRegistry.map((theme) => ({
          value: theme.id,
          title: theme.title,
        })),
      },
    },
  },
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
