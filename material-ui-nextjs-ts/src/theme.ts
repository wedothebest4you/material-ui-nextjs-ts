'use client';

import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import { indigo, red, blue } from '@mui/material/colors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  colorSchemes: { dark: true } /* light color scheme is enabled by default */,
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: 'info' },
              style: {
                backgroundColor: '#60a5fa',
              },
            },
          ],
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 1s ease, color 1s ease',
        },
      },
    },
  },
});
export default theme;
