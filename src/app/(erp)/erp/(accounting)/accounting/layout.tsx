// Accounting-specific context
// Period lock banner
// Shared filters (date range, fiscal year)
// Accounting nav tabs (GL / AR / AP / Reports)

export default function AccountingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
