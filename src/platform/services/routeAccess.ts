export default function canAccess(grantedRoutes: string[], path: string) {
  return grantedRoutes.includes(path);
}
