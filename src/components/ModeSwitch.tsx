'use client';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useColorScheme } from '@mui/material/styles';
import Pallet from '@mui/icons-material/Palette';

export default function ModeSwitch() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Select
      variant="standard"
      labelId="mode-select-label"
      id="mode-select"
      value={mode}
      onChange={(event) => setMode(event.target.value as typeof mode)}
      label="Appearance"
      IconComponent={Pallet}
      sx={{
        '& .MuiSelect-icon': {
          color: 'white',
        },
      }}
    >
      <MenuItem value="system">System</MenuItem>
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}
