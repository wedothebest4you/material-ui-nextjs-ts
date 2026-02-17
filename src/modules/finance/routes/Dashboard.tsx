// Dashboard Route

import Dashboard from '../ui/Dashboard';

export default function FinanceDashboard() {
  const stats = {
    cash: '120,000',
    ar: '45,200',
    ap: '31,000',
    profit: '12,400',
  };
  return <Dashboard stats={stats} />;
}
