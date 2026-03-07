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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  );
}
