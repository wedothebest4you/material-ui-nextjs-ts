'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// import TemplateForm from './account-template-form';
// import { IAccountTemplate } from '../model/account-template';

// import {
//   getAccountTemplates,
//   createAccountTemplate,
//   updateAccountTemplate,
//   softDeleteAccountTemplate,
// } from '../service/account-template-action';

export default function TemplateGrid() {
  const [rows, setRows] = useState<IAccountTemplate[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<IAccountTemplate>();

  const load = async () => {
    const data = await getAccountTemplates();
    console.log(data);
    setRows(data);
  };

  useEffect(() => {
    load();
  }, []);

  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Code', width: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'path', headerName: 'Path', flex: 1 },
    {
      field: 'accType',
      headerName: 'Account Type',
      width: 100,
      valueGetter: (p: any) => {
        // console.log('Data grid valueGetter');
        // console.log(p);
        return p.isGroup ? 'Yes' : 'No';
      },
    },
    { field: 'createdAt', headerName: 'Created at', flex: 1 },
    { field: 'updatedAt', headerName: 'UpdatedAt', flex: 1 },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              console.log('params.row', params.row);
              setSelected(params.row);
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            onClick={async () => {
              await softDeleteAccountTemplate(params.row._id);
              load();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            setSelected(undefined);
            setOpen(true);
          }}
        >
          New Account
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(r) => r.id}
        autoHeight
      />

      <TemplateForm
        open={open}
        selectedItem={selected}
        onClose={() => setOpen(false)}
        onSubmit={async (data: IAccountTemplate): Promise<boolean> => {
          if (selected) {
            await updateAccountTemplate(selected.id, data);
          } else {
            if (await createAccountTemplate(data)) {
              setOpen(false);
              load();
            }
          }
          return true;
        }}
      />
    </Box>
  );
}
