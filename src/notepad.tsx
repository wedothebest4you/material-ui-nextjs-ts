7. LockBanner.tsx
'use client';

import { Alert } from '@mui/material';

export default function LockBanner({ locked }: { locked: boolean }) {
if (!locked) return null;

return (
<Alert severity="warning" sx={{ mb: 2 }}>
This accounting period is locked. Posting is disabled.
</Alert>
);
}
