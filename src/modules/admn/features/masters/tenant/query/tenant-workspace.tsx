import { Typography } from '@mui/material';
import MastersWorkspace from '../../masters-workspace';
import TenantList from './tenant-list';
import { Suspense } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
  }>;
}) {
  return (
    <MastersWorkspace>
      <Suspense fallback={<div>Loading tenant list</div>}>
        <TenantList searchParams={searchParams} />
      </Suspense>
    </MastersWorkspace>
  );
}
