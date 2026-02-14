import { getAuthContext, Permission } from '@/lib/auth';

export default async function PermissionGate({
  permission,
  children,
  fallback = null,
}: {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const ctx = await getAuthContext();

  if (!ctx.permissions.includes(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
