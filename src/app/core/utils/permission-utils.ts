export class PermissionUtils {
  static has(user: any, permission: string): boolean {
    return (
      user?.roles?.some((role: any) =>
        role.permissions?.some((p: any) => p.name === permission)
      ) ?? false
    );
  }

  static isAdmin(user: any): boolean {
    return (
      PermissionUtils.has(user, 'access:admin-global') ||
      PermissionUtils.has(user, 'access:admin-sectoriel')
    );
  }

  static isGlobalAdmin(user: any): boolean {
    return PermissionUtils.has(user, 'access:admin-global');
  }
}
