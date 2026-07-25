import { createTheme } from '@mui/material/styles';

/**
 * Automates safe linear scaling calculation for clamp().
 * @param minRem - The lowest readable mobile size floor.
 * @param maxRem - The target desktop max size (Matches MUI Default).
 */
const fluidText = (minRem: number, maxRem: number) => {
  const minWidth = 20; // 320px / 16px
  const maxWidth = 75; // 1200px / 16px

  const slope = (maxRem - minRem) / (maxWidth - minWidth);
  const intercept = minRem - slope * minWidth;

  // Format: clamp(low, calc(intercept + slope * vw), upper)
  return `clamp(${minRem}rem, ${intercept.toFixed(4)}rem + ${(slope * 100).toFixed(4)}vw, ${maxRem}rem)`;
};

const fluidTheme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#d914bb7a',
        },
        background: {
          paper: '#ea9ee7f5',
          default: '#dd8ed3',
        },
        warning: {
          main: '#d957ebf4',
        },
        action: {
          active: 'currentColor',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#90e66b',
        },
        secondary: {
          main: '#90e66b',
        },
        background: {
          default: '#09090b',
          paper: '#09090b',
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: '--font-Inter',
    // Large Headings: Need strong, visible reduction boundaries on mobile
    h1: { fontSize: fluidText(2.5, 6.0) }, // 40px -> 96px
    h2: { fontSize: fluidText(2.0, 3.75) }, // 32px -> 60px
    h3: { fontSize: fluidText(1.75, 3.0) }, // 28px -> 48px
    h4: { fontSize: fluidText(1.5, 2.125) }, // 24px -> 34px

    // Mid Headings: Gradual micro-scaling limits
    h5: { fontSize: fluidText(1.25, 1.5) }, // 20px -> 24px
    h6: { fontSize: fluidText(1.125, 1.25) }, // 18px -> 20px

    // Body & Interface Elements: Kept tight to protect user legibility rules
    subtitle1: { fontSize: fluidText(0.9375, 1.0) }, // 15px -> 16px
    subtitle2: { fontSize: fluidText(0.8125, 0.875) }, // 13px -> 14px
    body1: { fontSize: fluidText(0.9375, 1.0) }, // 15px -> 16px
    body2: { fontSize: fluidText(0.8125, 0.875) }, // 13px -> 14px

    // Captions & Metadata: Kept static to respect minimal visual rendering limits
  },
  // components: {
  //   MuiBadge: {
  //     styleOverrides: {
  //       badge: ({ theme }) => {
  //         theme.applyStyles('light', {
  //           backgroundColor: 'var(--mui-palette-background-paper)',
  //           color: 'currentColor',
  //         });
  //         theme.applyStyles('dark', {
  //           backgroundColor: 'var(--mui-palette-background-paper)',
  //           color: 'currentColor',
  //         });
  //       },
  //     },
  //   },
  // },
});

export default fluidTheme;
