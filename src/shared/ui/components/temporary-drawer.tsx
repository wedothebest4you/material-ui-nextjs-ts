import { Toolbar } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Dispatch, SetStateAction, ReactElement } from 'react';

export default function TemporaryDrawer({
  toggle,
  setToggle,
  drawerContent,
}: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  drawerContent: ReactElement;
}) {
  return (
    <>
      <Drawer
        variant="temporary"
        open={toggle}
        onClose={() => setToggle(!toggle)}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
        keepMounted={true}
      >
        <Toolbar variant="dense" />
        {drawerContent}
      </Drawer>
    </>
  );
}
