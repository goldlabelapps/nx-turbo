import { createTheme } from '@mui/material';
import { T_Theme } from '../../../NX/types';

export function useMUI(t: T_Theme) {
  if (!t) return;

  return createTheme({
    shadows: Array(25).fill('none') as any,
    palette: {
      mode: t.mode ?? 'light',
      primary: { main: t.primary },
      secondary: { main: t.secondary },
      success: { main: t.success ?? t.primary },
      info: { main: t.info ?? t.secondary },
      warning: { main: t.warning ?? t.secondary },
      error: { main: t.error ?? t.primary },
      divider: t.border,
      background: {
        default: t.background,
        paper: t.paper,
      },
      text: {
        primary: t.text,
        secondary: t.primary,
      },
    },
    typography: {
      fontFamily: '"DM Sans", system-ui, sans-serif',
      fontWeightLight: 400,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
      fontSize: 18, // base font size (default is 14)
      h1: { fontSize: '3rem', fontWeight: 400, fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic' },
      h2: { fontSize: '2.5rem', fontWeight: 400, fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic' },
      h3: { fontSize: '2rem', fontWeight: 400, fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic' },
      h4: { fontSize: '1.75rem', fontWeight: 400, fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic' },
      h5: { fontSize: '1.5rem', fontWeight: 400, fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic' },
      h6: { fontSize: '1.25rem', fontWeight: 400, fontFamily: '"Times New Roman", Times, serif', fontStyle: 'italic' },
      body1: { fontSize: '1.15rem', fontWeight: 400, fontFamily: '"DM Sans", system-ui, sans-serif' },
      body2: { fontSize: '1rem', fontWeight: 400, fontFamily: '"DM Sans", system-ui, sans-serif' },
      subtitle1: { fontSize: '1.1rem', color: t.primary, fontWeight: 400, fontFamily: '"DM Sans", system-ui, sans-serif' },
      subtitle2: { fontSize: '1rem', color: t.primary, fontWeight: 400, fontFamily: '"DM Sans", system-ui, sans-serif' },
      button: { fontSize: '1rem', fontWeight: 400, fontFamily: '"DM Mono", ui-monospace, monospace' },
      caption: { fontSize: '0.95rem', fontWeight: 400, fontFamily: '"DM Mono", ui-monospace, monospace' },
      overline: { fontSize: '0.66rem', fontWeight: 400, fontFamily: '"DM Mono", ui-monospace, monospace', letterSpacing: '0.28em', textTransform: 'uppercase' },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          variant: 'standard',
        },
      },
      MuiFormControl: {
        defaultProps: {
          variant: 'standard',
        },
      },
      MuiSelect: {
        defaultProps: {
          variant: 'standard',
        },
      },
      MuiCard: {
        defaultProps: {
          variant: 'outlined',
        },
      },
      MuiPaper: {
        defaultProps: {
          variant: 'outlined',
        },
      },
      MuiAccordion: {
        defaultProps: {
          variant: 'outlined',
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
          },
          containedPrimary: {
            fontWeight: 400,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          icon: {
            padding: '2px',
            fontSize: '1rem',
          },
          iconSmall: {
            padding: '2px',
            fontSize: '0.9rem',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxShadow: 'none !important',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h1: { fontWeight: "normal" },
          h2: { fontWeight: "normal" },
          h3: { fontWeight: "normal" },
          h4: { fontWeight: "normal" },
          h5: { fontWeight: "normal" },
          h6: { fontWeight: "normal" },
          subtitle1: { color: t.primary },
          subtitle2: { color: t.primary },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: t.primary,
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: { color: t.primary },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { color: t.primary },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: { borderColor: t.primary },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: { color: t.primary },
        },
      },
    },
  });
}
