'use client';

import { Grid } from '@shared/ui/Grid';
import StatCard from '@/platform/ui/StatCard';

export default function Dashboard({
  stats,
}: {
  stats: {
    cash: string;
    ar: string;
    ap: string;
    profit: string;
  };
}) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <StatCard label="Cash" value={stats.cash} />
      </Grid>

      <Grid item xs={12} md={3}>
        <StatCard label="AR Outstanding" value={stats.ar} />
      </Grid>

      <Grid item xs={12} md={3}>
        <StatCard label="AP Outstanding" value={stats.ap} />
      </Grid>

      <Grid item xs={12} md={3}>
        <StatCard label="Profit" value={stats.profit} />
      </Grid>
    </Grid>
  );
}
