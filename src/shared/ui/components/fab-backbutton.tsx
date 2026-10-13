'use client';

import Fab from '@mui/material/Fab';
import { useRouter } from 'next/navigation';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function FabBackButton() {
  const router = useRouter();
  return (
    <Fab
      size="medium"
      color="primary"
      onClick={() => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
          router.back();
        } else {
          router.push('/');
        }
      }}
    >
      <ArrowBackRoundedIcon />
    </Fab>
  );
}
