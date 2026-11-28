import { Typography } from '@mui/material';
import TenantService from './service';
import { Box } from '@mui/material';
import TenantListUI from './tenant_list_ui';
export default async function TenantList({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
  }>;
}) {
  const { query } = await searchParams;

  const docs = await TenantService.getActiveTenants();
  return <TenantListUI data={docs} />;
}
//
