import type { NavigationItemBase } from './NavigationItemBase';

export type ModuleManifestBase<TPermission extends string> = {
  id: string;
  //ToDo: Refresh this data type
  permissions: Record<string, TPermission>;
  //ToDo: Ensure it is enough type safe
  navigation: NavigationItemBase<TPermission>[];
  //ToDo: What is this type ?
  shell?: React.ComponentType<any>;
};
