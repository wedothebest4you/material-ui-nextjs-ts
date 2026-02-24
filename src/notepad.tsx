src / platform / shell / Sidebar.tsx;
('use client');

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Link from 'next/link';
import { NavNode } from '../navigation/types';

type Props = {
  nodes: NavNode[];
};

export default function Sidebar({ nodes }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (label: string) =>
    setOpen((s) => ({ ...s, [label]: !s[label] }));

  const renderNode = (node: NavNode) => {
    if (node.type === 'item') {
      const active = pathname === node.path;

      return (
        <ListItemButton
          key={node.path}
          component={Link}
          href={node.path}
          selected={active}
        >
          {node.icon && <ListItemIcon>{node.icon}</ListItemIcon>}
          <ListItemText primary={node.label} />
        </ListItemButton>
      );
    }

    const isOpen = open[node.label] ?? true;

    return (
      <div key={node.label}>
        <ListItemButton onClick={() => toggle(node.label)}>
          {node.icon && <ListItemIcon>{node.icon}</ListItemIcon>}
          <ListItemText primary={node.label} />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={isOpen} timeout="auto">
          <List component="div" disablePadding>
            {node.children.map(renderNode)}
          </List>
        </Collapse>
      </div>
    );
  };

  return <List>{nodes.map(renderNode)}</List>;
}
