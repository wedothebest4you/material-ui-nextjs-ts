'use client';

import Fab from '@mui/material/Fab';
import Link from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import FabWithEntityRouteProps from './entity-route-props';
export default function FabWithEntityRoute({
  action,
  entityId,
  children,
}: FabWithEntityRouteProps) {
  const pathName = usePathname();

  return (
    <Fab
      size="medium"
      color="primary"
      LinkComponent={Link}
      href={[pathName, action, entityId].filter((i) => i).join('/')}
    >
      {children}
    </Fab>
  );
}
