'use client';

import Fab from '@mui/material/Fab';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type FabWithEntityRouteProps =
  | {
      action: 'add';
      entityId?: undefined;
      children: ReactNode;
    }
  | {
      action: 'edit' | 'delete' | 'view';
      entityId: string;
      children: ReactNode;
    };

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
      href={`${pathName}/${action}/${entityId}`}
    >
      {children}
    </Fab>
  );
}
