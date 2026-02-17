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
  if (allowed) {
    return <Button {...props} />;
  }

  return (
    <Tooltip title={reason ?? 'Permission denied'}>
      <span>
        <Button {...props} />
      </span>
    </Tooltip>
  );
}
