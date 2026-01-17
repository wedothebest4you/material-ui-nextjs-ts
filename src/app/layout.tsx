import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import theme from '@/theme';
import ModeSwitch from '@/components/ModeSwitch';
import './PlainCssSlider.css';
import { StyledEngineProvider } from '@mui/material/styles';
import { LogTheme } from './LogTheme';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LogTheme />
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <StyledEngineProvider>
            <ThemeProvider theme={theme}>
              <LogTheme />
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <ModeSwitch />
              {props.children}
            </ThemeProvider>
          </StyledEngineProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
