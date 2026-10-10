import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';

import Box from '@mui/material/Box';
import { FabWithEntityRoute } from '@/shared/client';
import { Suspense } from 'react';

export default function MastersLayout({
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
          justifyContent: 'flex-start',
          gap: 5,
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
      <Box sx={{ flex: 1, height: '100vh' }}>Test</Box>
    </Box>
  );
}
