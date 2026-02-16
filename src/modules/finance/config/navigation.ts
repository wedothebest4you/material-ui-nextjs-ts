//Centralized module navigation definition.

export type FinanceNavItem = {
  label: string;
  path: string;
};

export const financeNavigation: FinanceNavItem[] = [
  { label: 'Dashboard', path: '/finance' },
  { label: 'GL', path: '/finance/gl' },
  { label: 'Journals', path: '/finance/journals' },
  { label: 'Invoices', path: '/finance/invoices' },
  { label: 'Payments', path: '/finance/payments' },
  { label: 'Reports', path: '/finance/reports' },
];
