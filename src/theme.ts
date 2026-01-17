'use client';
import { createTheme, useTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import { purple, pink } from '@mui/material/colors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: pink.A200,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      '@media (min-width:0px)': {
        fontSize: '2.4rem',
      },
    },
  },
  components: {
    // MuiSlider: {
    //   styleOverrides: {
    //     root: {
    //       color: '#fff',
    //     },
    //   },
    // },
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
  },
});

export default theme;
