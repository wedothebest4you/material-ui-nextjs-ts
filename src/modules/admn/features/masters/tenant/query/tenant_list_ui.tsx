'use client';
import { Typography } from '@mui/material';
import TenantService from './service';
import { Box } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';

export default function TenantListUI({ data }: any) {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
    },
    {
      field: 'code',
      headerName: 'Code',
    },
    {
      field: 'plan',
      headerName: 'Plan',
    },
    {
      field: 'status',
      headerName: 'Status',
    },
    {
      field: 'userLimit',
      headerName: 'Users',
    },
  ];
  return (
    <>
      <Typography variant="h3">Tenant Workspace</Typography>
      <Typography variant="caption" color="primary">
        List cached on {data.cacheTimestamp}
      </Typography>
      <Box>
        <DataGrid
          rows={data.data}
          columns={columns}
          checkboxSelection
          disableMultipleRowSelection
        />
      </Box>
    </>
  );
}
//
