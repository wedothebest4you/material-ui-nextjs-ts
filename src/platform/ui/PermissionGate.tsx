// Permission-aware UI wrapper

import { getAuthContext, Permission } from '@/platform/auth/auth';
import { ReactNode } from 'react';

export async function PermissionGate({
  permission,
  children,
  fallback,
}: {
  permission: Permission;
  children: ReactNode;
  fallback: ReactNode;
}) {
  const ctx = await getAuthContext();

  if (!ctx.permissions.includes(permission)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}
