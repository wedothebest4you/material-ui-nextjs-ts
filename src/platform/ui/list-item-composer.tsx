'use client';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import { Fragment, ReactNode, useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function ListItemComposer({
  description,
  children,
}: {
  description: string;
  children: ReactNode;
}) {
  const [toggle, setToggle] = useState(false);
  return (
    <Fragment>
      <ListItemButton onClick={() => setToggle(!toggle)}>
        <ListItemText>{description}</ListItemText>
        {toggle ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={toggle}>{children}</Collapse>
    </Fragment>
  );
}
