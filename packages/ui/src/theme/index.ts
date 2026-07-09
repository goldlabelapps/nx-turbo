import { createTheme, ThemeOptions } from '@mui/material/styles';

/**
 * Leida Design System Theme for Material-UI
 * Maps Leida tokens to MUI palette, typography, and component overrides
 */

// Leida Color Tokens
const LEIDA_COLORS = {
  parchment: '#f7f7f4',
  paper: '#fbfaf7',
  ink: '#1a1814',
  body: '#3a3530',
  clay: '#a8927a',
  textMuted: 'rgba(40,34,28,0.66)',
  borderLight: 'rgba(40,34,28,0.12)',
  borderDark: 'rgba(26,24,20,0.32)',
  shadowLight: 'rgba(40,34,28,0.12)',
  shadowMedium: 'rgba(40,34,28,0.20)',
  shadowDark: 'rgba(26,24,20,0.32)',
} as const;

// Leida Spacing Scale
const SPACING_SCALE = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
  '4xl': '64px',
  '5xl': '96px',
} as const;

// Leida Border Radii
const BORDER_RADII = {
  sm: '14px',
  md: '20px',
  lg: '26px',
  xl: '28px',
  pill: '9999px',
  device: '42px',
} as const;

// Theme options
const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: LEIDA_COLORS.clay,
      light: '#c9bfb3',
      dark: '#8b7a65',
      contrastText: LEIDA_COLORS.paper,
    },
    secondary: {
      main: LEIDA_COLORS.ink,
      light: LEIDA_COLORS.body,
      dark: LEIDA_COLORS.ink,
      contrastText: LEIDA_COLORS.paper,
    },
    background: {
      default: LEIDA_COLORS.parchment,
      paper: LEIDA_COLORS.paper,
    },
    text: {
      primary: LEIDA_COLORS.ink,
      secondary: LEIDA_COLORS.body,
      disabled: LEIDA_COLORS.textMuted,
    },
    divider: LEIDA_COLORS.borderLight,
    action: {
      active: LEIDA_COLORS.clay,
      hover: 'rgba(168,146,122,0.08)',
      selected: 'rgba(168,146,122,0.12)',
      disabled: LEIDA_COLORS.textMuted,
      disabledBackground: 'rgba(40,34,28,0.04)',
    },
    success: {
      main: '#6b8e23',
      light: '#9acd32',
      dark: '#556b2f',
    },
    warning: {
      main: '#d97706',
      light: '#fbbf24',
      dark: '#b45309',
    },
    error: {
      main: '#dc2626',
      light: '#fca5a5',
      dark: '#991b1b',
    },
    info: {
      main: LEIDA_COLORS.clay,
      light: '#c9bfb3',
      dark: '#8b7a65',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'DM Sans',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: '"Times New Roman", serif',
      fontSize: '4rem',
      fontWeight: 400,
      fontStyle: 'italic',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      marginBottom: '1.5rem',
    },
    h2: {
      fontFamily: '"Times New Roman", serif',
      fontSize: '3.5rem',
      fontWeight: 400,
      fontStyle: 'italic',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      marginBottom: '1.25rem',
    },
    h3: {
      fontFamily: '"Times New Roman", serif',
      fontSize: '2.5rem',
      fontWeight: 400,
      fontStyle: 'italic',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      marginBottom: '1rem',
    },
    h4: {
      fontFamily: '"Times New Roman", serif',
      fontSize: '1.875rem',
      fontWeight: 400,
      fontStyle: 'italic',
      lineHeight: 1.4,
      marginBottom: '0.875rem',
    },
    h5: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
      marginBottom: '0.75rem',
    },
    h6: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.6,
      marginBottom: '0.5rem',
    },
    body1: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '0.9375rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    subtitle1: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    subtitle2: {
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    button: {
      fontFamily: '"DM Mono", monospace',
      fontSize: '0.875rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      lineHeight: 1.4,
    },
    caption: {
      fontFamily: '"DM Mono", monospace',
      fontSize: '0.75rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      lineHeight: 1.4,
    },
    overline: {
      fontFamily: '"DM Mono", monospace',
      fontSize: '0.625rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.22em',
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 26,
  },
  spacing: 8,
  shadows: [
    'none',
    `0 2px 4px ${LEIDA_COLORS.shadowLight}`,
    `0 4px 8px ${LEIDA_COLORS.shadowLight}`,
    `0 6px 12px ${LEIDA_COLORS.shadowLight}`,
    `0 8px 16px ${LEIDA_COLORS.shadowLight}`,
    `0 12px 24px ${LEIDA_COLORS.shadowMedium}`,
    `0 12px 32px ${LEIDA_COLORS.shadowMedium}`,
    `0 16px 40px ${LEIDA_COLORS.shadowMedium}`,
    `0 20px 48px ${LEIDA_COLORS.shadowMedium}`,
    `0 24px 56px ${LEIDA_COLORS.shadowMedium}`,
    `0 28px 66px ${LEIDA_COLORS.shadowDark}`,
    `0 32px 72px ${LEIDA_COLORS.shadowDark}`,
    `0 36px 80px ${LEIDA_COLORS.shadowDark}`,
    `0 40px 80px ${LEIDA_COLORS.shadowDark}`,
    `0 40px 88px ${LEIDA_COLORS.shadowDark}`,
    `0 48px 96px ${LEIDA_COLORS.shadowDark}`,
    `0 52px 104px ${LEIDA_COLORS.shadowDark}`,
    `0 56px 112px ${LEIDA_COLORS.shadowDark}`,
    `0 60px 120px ${LEIDA_COLORS.shadowDark}`,
    `0 64px 128px ${LEIDA_COLORS.shadowDark}`,
    `0 68px 136px ${LEIDA_COLORS.shadowDark}`,
    `0 72px 144px ${LEIDA_COLORS.shadowDark}`,
    `0 76px 152px ${LEIDA_COLORS.shadowDark}`,
    `0 80px 160px ${LEIDA_COLORS.shadowDark}`,
    `0 84px 168px ${LEIDA_COLORS.shadowDark}`,
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADII.pill,
          textTransform: 'uppercase',
          fontFamily: '"DM Mono", monospace',
          letterSpacing: '0.12em',
          fontWeight: 600,
          fontSize: '0.875rem',
          padding: '12px 28px',
          transition: 'all 0.3s cubic-bezier(0.2, 0.7, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 12px 40px ${LEIDA_COLORS.shadowMedium}`,
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          backgroundColor: LEIDA_COLORS.clay,
          color: LEIDA_COLORS.paper,
          '&:hover': {
            backgroundColor: '#8b7a65',
          },
        },
        outlined: {
          borderColor: LEIDA_COLORS.clay,
          color: LEIDA_COLORS.clay,
          '&:hover': {
            backgroundColor: 'rgba(168,146,122,0.08)',
          },
        },
        text: {
          color: LEIDA_COLORS.clay,
          '&:hover': {
            backgroundColor: 'rgba(168,146,122,0.08)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: BORDER_RADII.pill,
            backgroundColor: LEIDA_COLORS.paper,
            '& fieldset': {
              borderColor: LEIDA_COLORS.borderLight,
            },
            '&:hover fieldset': {
              borderColor: LEIDA_COLORS.borderLight,
            },
            '&.Mui-focused fieldset': {
              borderColor: LEIDA_COLORS.clay,
              borderWidth: 2,
            },
          },
          '& .MuiInputBase-input': {
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '1rem',
            padding: '12px 16px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADII.lg,
          backgroundColor: LEIDA_COLORS.paper,
          boxShadow: `0 12px 40px ${LEIDA_COLORS.shadowLight}`,
          border: `1px solid ${LEIDA_COLORS.borderLight}`,
          transition: 'all 0.3s cubic-bezier(0.2, 0.7, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 28px 66px ${LEIDA_COLORS.shadowMedium}`,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: BORDER_RADII.pill,
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          padding: '4px 12px',
          backgroundColor: LEIDA_COLORS.clay,
          color: LEIDA_COLORS.paper,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: LEIDA_COLORS.clay,
          '&.Mui-checked': {
            color: LEIDA_COLORS.clay,
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: LEIDA_COLORS.clay,
          '&.Mui-checked': {
            color: LEIDA_COLORS.clay,
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'transparent',
          border: `1px solid ${LEIDA_COLORS.borderLight}`,
          boxShadow: 'none',
          '&:before': {
            display: 'none',
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
