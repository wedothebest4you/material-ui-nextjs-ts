import { Typography } from '@mui/material';
import MastersWorkspace from '../masters-workspace';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
  }>;
}) {
  const { query } = await searchParams;

  return (
    <MastersWorkspace>
      <Typography variant="h3">Tenant workspace</Typography>
      <Typography>{query}</Typography>
    </MastersWorkspace>
  );
}
