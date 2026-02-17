// Left-hand ERP navigation (permission-aware)

import Link from 'next/link';

import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';

import { getAuthContext } from '../auth/auth';

export default async function Nav() {
  const ctx = await getAuthContext();

  return (
    <Box sx={{ width: 260, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {ctx.orgName}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <List>
        <ListItemButton component={Link} href="/erp/dashboard">
          <ListItemText primary="Dashboard"></ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );
}
