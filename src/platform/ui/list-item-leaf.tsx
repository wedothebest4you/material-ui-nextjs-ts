'use client';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';

export default function ListItemLeaf({
  description,
  routePath,
}: {
  description: string;
  routePath: string;
}) {
  console.log(routePath);
  return (
    <ListItemButton LinkComponent={Link} href={routePath}>
      <ListItemText>
        {description}
        {routePath}
      </ListItemText>
    </ListItemButton>
  );
}
