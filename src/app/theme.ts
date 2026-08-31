'use client';
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
          main: '#bf0572f5',
        },
        secondary: {
          main: '#f899c1',
        },
        background: {
          paper: '#ed9dd0',
          default: '#d933c463',
        },
        action: {
          active: 'currentColor',
          activeChannel: undefined,
        },
      },
    },

    dark: true,
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
  //         const cssObjDark = theme.applyStyles('dark', {
  //           backgroundColor: 'var(--mui-palette-common-white)',
  //         });
  //         const cssObjLight = theme.applyStyles('light', {
  //           backgroundColor: 'var(--mui-palette-common-black)',
  //         });
  //         return { ...cssObjLight, ...cssObjDark };
  //       },
  //     },
  //     //  ({ theme }) => {

  //     // theme.applyStyles('dark', {
  //     //   backgroundColor: 'var(--mui-palette-background-paper)',
  //     //   color: 'currentColor',
  //     // });
  //   },
  // },
});

export default fluidTheme;
