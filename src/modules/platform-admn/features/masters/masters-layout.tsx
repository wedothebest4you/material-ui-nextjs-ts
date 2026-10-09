import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { FabWithEntityRoute } from '@/shared/client';

export default function MastersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 5,
        ml: 2,
      }}
    >
      <FabWithEntityRoute action="add">
        <AddIcon />
      </FabWithEntityRoute>
      <FabWithEntityRoute action="edit" entityId="x">
        <EditIcon />
      </FabWithEntityRoute>
      <FabWithEntityRoute action="delete" entityId="x">
        <DeleteIcon />
      </FabWithEntityRoute>
      {children}
    </Box>
  );
}
