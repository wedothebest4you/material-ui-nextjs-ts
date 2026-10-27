'use client';

import { useFormStatus } from 'react-dom';
import SaveIcon from '@mui/icons-material/Save';
import Fab from '@mui/material/Fab';

export default function ServerActionSubmit() {
  const { pending } = useFormStatus();
  return (
    <Fab size="medium" color="primary" disabled={pending} type="submit">
      <SaveIcon />
    </Fab>
  );
}
