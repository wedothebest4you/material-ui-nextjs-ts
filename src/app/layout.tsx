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

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
