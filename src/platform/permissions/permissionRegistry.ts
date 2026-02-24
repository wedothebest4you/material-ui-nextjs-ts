export class PermissionRegistry {
  private static permissions = new Set<string>();

  static register(permissionMap: Record<string, string>) {
    Object.values(permissionMap).forEach((permission) => {
      //ToDo : Please test
      if (this.permissions.has(permission))
        throw new Error(`Duplicate permission ${permission}`);
      this.permissions.add(permission);
    });
  }
  static getAll() {
    return Array.from(this.permissions);
  }
}
