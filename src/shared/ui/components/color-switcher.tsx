'use client';

import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material';
import { LightMode, DarkMode, SettingsBrightness } from '@mui/icons-material';

import { Tooltip } from '@mui/material';

export default function ColorSchemeSwitcher() {
  const { mode, setMode } = useColorScheme();
  // first render will have no colorSchem - both the SSR and CSR
  // performs an early return here.
  // the actual state will receive here once the special script updates the
  // browser store.
  // console.log(`mode : ${mode}`);
  if (!mode) {
    return;
  }
  const modes = {
    system: {
      icon: SettingsBrightness,
      next: 'light',
    },
    light: {
      icon: LightMode,
      next: 'dark',
    },
    dark: {
      icon: DarkMode,
      next: 'system',
    },
  } as const;

  const colorSchemeButtonCycles = () => {
    setMode(modes[mode].next);
  };

  //we need an component indentifier not an expression for the same.
  const IconIdentifier = modes[mode].icon;
  const colorSchemeStatus = `Color mode : ${mode} - click for ${modes[mode].next}`;

  return (
    <Tooltip title={colorSchemeStatus}>
      <IconButton onClick={colorSchemeButtonCycles}>
        {<IconIdentifier />}
      </IconButton>
    </Tooltip>
  );
}
