import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';

import Box from '@mui/material/Box';
import { FabWithEntityRoute } from '@/shared/client';
import { EntityContextLabel } from '@/shared/client/index';
import { Suspense } from 'react';

export default function MastersWorkspace({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        ml: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 5,
          mt: 1,
          ml: 1,
        }}
      >
        <Suspense fallback={<div>Loading command buttons...</div>}>
          <FabWithEntityRoute action="add">
            <AddIcon />
          </FabWithEntityRoute>
          <FabWithEntityRoute action="view" entityId="x">
            <Visibility />
          </FabWithEntityRoute>
          <FabWithEntityRoute action="edit" entityId="x">
            <EditIcon />
          </FabWithEntityRoute>
          <FabWithEntityRoute action="delete" entityId="x">
            <DeleteIcon />
          </FabWithEntityRoute>
        </Suspense>
      </Box>
      <Suspense fallback={<div>Loading Context label...</div>}></Suspense>
      {children}
    </Box>
  );
}
