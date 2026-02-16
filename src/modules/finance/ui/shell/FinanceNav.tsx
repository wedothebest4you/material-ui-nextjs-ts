// Finance Navigation UI

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { financeNavigation } from '@modules/finance/config/navigation';

export default function FinanceNav() {
  const pathName = usePathname();

  return (
    <List dense>
      {financeNavigation.map((i) => (
        <ListItemButton
          key={i.path}
          component={Link}
          href={i.path}
          selected={pathName === i.path}
        >
          <ListItemText primary={i.label}></ListItemText>
        </ListItemButton>
      ))}
    </List>
  );
}
