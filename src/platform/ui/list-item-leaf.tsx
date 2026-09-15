'use client';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';

export default function ListItemLeaf({
  description,
  fullpath,
}: {
  description: string;
  fullpath: string;
}) {
  return (
    <ListItemButton LinkComponent={Link} href={'/'}>
      <ListItemText>{description}</ListItemText>
    </ListItemButton>
  );
}
