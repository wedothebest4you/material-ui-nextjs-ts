/**
 * ROOT APPLICATION LAYOUT
 *
 * Responsibility:
 * Defines the HTML and BODY wrapper for the entire Next.js application.
 *
 * Architectural role:
 * App Layer (global)
 *
 * Rules:
 * - Must NOT import platform internals
 * - Must NOT import modules
 * - Only defines HTML shell
 *
 * This is owned by Next.js App Router, not by platform or modules.
 */
'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Inter } from 'next/font/google';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

const fontInter = Inter({
  variable: '--font-Inter',
  subsets: ['latin'],
  display: 'swap',
});

// console.log(fontInter);
import fluidTheme from './theme';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontInter.variable} suppressHydrationWarning>
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <AppRouterCacheProvider>
          <InitColorSchemeScript attribute="class" />
          <ThemeProvider theme={fluidTheme}>
            <main>{children}</main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
