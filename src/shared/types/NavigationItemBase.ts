export type NavigationItemBase<TPermission extends string> = {
  id: string;
  label: string;
  path: string;
  permission?: TPermission;
  children?: NavigationItemBase<TPermission>[];
};
