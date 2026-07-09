'use client';
import * as React from 'react';
import { T_Theme, I_DesignSystem } from '../../../NX/types';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useMUI } from '../hooks/useMUI';


export default function MUI({
  theme,
  children,
}: I_DesignSystem) {
  const themeConfig = (theme as any)?.config;
  const themes = themeConfig?.themes ?? {};
  const defaultThemeKey = themeConfig?.defaultTheme ?? 'light';
  const activeThemeKey =
    themeConfig?.activeTheme ??
    themeConfig?.currentTheme ??
    themeConfig?.theme ??
    defaultThemeKey;

  const selectedTheme: T_Theme | undefined =
    themes?.[activeThemeKey] ?? themes?.[defaultThemeKey] ?? themes?.light ?? themes?.dark;

  const newtheme = useMUI(selectedTheme as T_Theme);

  if (!newtheme) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider theme={newtheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
