// Route Layout Adapter
// This connects module shell to Next routing.

import { ReactNode } from 'react';
import FinanceShell from '../ui/FinanceShell';

export default function FinanceLayout({ children }: { children: ReactNode }) {
  return <FinanceShell>{children}</FinanceShell>;
}
