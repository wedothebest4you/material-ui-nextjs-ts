// Dashboard Component
'use client';

import Grid from '@mui/material/GridLegacy';
import StatCard from '@shared/ui/StatCard';

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
      <Grid item>
        <StatCard label="Cash" value={stats.cash}></StatCard>
      </Grid>
      <Grid item>
        <StatCard label="AR Outstanding" value={stats.ar}></StatCard>
      </Grid>
      <Grid item>
        <StatCard label="AP Outstanding" value={stats.ap}></StatCard>
      </Grid>
      <Grid item>
        <StatCard label="Profit" value={stats.profit}></StatCard>
      </Grid>
    </Grid>
  );
}
