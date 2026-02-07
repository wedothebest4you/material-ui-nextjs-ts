'use client';

import { Button, Tooltip } from '@mui/material';

export default function PermissionButton({
  allowed,
  reason,
  ...props
}: {
  allowed: boolean;
  reason: string;
} & React.ComponentProps<typeof Button>) {
  //ToDo : Check what is this React.ComponentProps<typeof Button>
  // Why to have props spread here in the formal arguments
  if (allowed) {
    return <Button {...props} />;
  }

  return (
    //ToDO what is the below operator ??
    <Tooltip title={reason ?? 'Permission denied'}>
      <span>
        <Button {...props} disabled />
      </span>
    </Tooltip>
  );
}
