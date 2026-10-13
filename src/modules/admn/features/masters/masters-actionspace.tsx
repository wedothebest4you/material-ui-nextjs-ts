import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SaveIcon from '@mui/icons-material/Save';
import { FabBackButton } from '@/src/shared/client';

import Box from '@mui/material/Box';

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
          gap: 20,
          mt: 1,
          ml: 1,
        }}
      >
        <FabBackButton />
      </Box>
      {children}
    </Box>
  );
}
