'use client';

import { Typography } from '@mui/material';
import FabWithEntityRouteProps from './entity-route-props';

export default function EntityActionLabel({
  action,
  entityId,
}: FabWithEntityRouteProps) {
  const label = () => {
    switch (action) {
      case 'add':
        return 'Creating a new record';
      case 'edit':
        return `Editing the record with referece : ${entityId}`;
      case 'delete':
        return `Deleting the record with referece : ${entityId}`;
      default:
        return `Unknown operation - Application error`;
    }
  };
  return <Typography>{label()}</Typography>;
}
