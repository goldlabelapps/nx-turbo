export type StorybookTheme = {
  id: string;
  title: string;
  designSystem: string;
};

// Add a new theme here to make it available in the Storybook toolbar.
export const themeRegistry: StorybookTheme[] = [
  {
    id: "oldfashioned",
    title: "Oldfashioned",
    designSystem: "oldfashioned",
  },
  {
    id: "unix",
    title: "Unix",
    designSystem: "unix",
  },
  {
    id: "newspaper",
    title: "Newspaper",
    designSystem: "nx",
  },
];

export const defaultThemeId = themeRegistry[0]?.id ?? "unix";
