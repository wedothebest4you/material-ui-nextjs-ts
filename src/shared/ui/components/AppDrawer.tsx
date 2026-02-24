'use client';

import type { NavigationItem } from '@shared/types/NavigationItem';
import Drawer from '@mui/material/Drawer';

export function AppDrawer({ navigation }: { navigation: NavigationItem[] }) {
  return (
    <Drawer variant="permanent">
      {navigation.map((item) => (
        <div key={item.id}>{item.label}</div>
      ))}
    </Drawer>
  );
}
