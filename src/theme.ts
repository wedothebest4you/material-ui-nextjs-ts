'use client';
import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { main: blue.A700 },
      },
    },
    dark: true,
    // no customised colors applied here
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
});

export default theme;
