import { PermissionMapBase } from './PermissionMapBase';

export type PermissionOf<T extends PermissionMapBase> = T[keyof T];
