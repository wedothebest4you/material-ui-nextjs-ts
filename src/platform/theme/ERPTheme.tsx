// Central MUI theme for the ERP

'use client';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

export const erpTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1f3a5f', // finance blue
    },
    secondary: {
      main: '#4caf50',
    },
    background: {
      default: '#f6f7f9',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
    ].join(','),
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export function ERPThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={erpTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
