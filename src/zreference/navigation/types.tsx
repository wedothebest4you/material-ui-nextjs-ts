import { ReactNode } from 'react';

export type NavLeaf = {
  type: 'item';
  label: string;
  path: string;
  icon?: ReactNode;
};

export type NavGroup = {
  type: 'group';
  label: string;
  icon?: ReactNode;
  children: NavNode[];
};

export type NavNode = NavLeaf | NavGroup;
