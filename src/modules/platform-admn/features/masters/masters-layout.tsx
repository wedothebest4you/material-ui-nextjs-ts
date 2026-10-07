import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

export default function MastersLayout({
  addForm,
  editForm,
  deleteForm,
  children,
}: {
  addForm: React.JSX.Element;
  editForm: React.JSX.Element;
  deleteForm: React.JSX.Element;
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
      <Fab size="medium" color="primary">
        <AddIcon />
      </Fab>
      <Fab size="medium" color="primary">
        <EditIcon />
      </Fab>
      <Fab size="medium" color="primary">
        <DeleteIcon />
      </Fab>
      {children}
    </Box>
  );
}
