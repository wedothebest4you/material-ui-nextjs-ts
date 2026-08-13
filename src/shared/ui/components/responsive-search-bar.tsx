'use client';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function ResponsiveSearchBar() {
  const [mobileSearchMode, setMobileSearchMode] = useState(false);

  return (
    <>
      <TextField
        variant="outlined"
        type="search"
        size="small"
        placeholder="search anywhere in ERP system"
        fullWidth
        margin="dense"
        sx={{
          display: { xs: 'none', md: 'inline' },
          //   //typography: 'caption',
          '& .MuiOutlinedInput-root': {
            //     color: 'var(--mui-palette-common-white)',
            borderRadius: '20px',
            border: '1.34px solid var(--mui-palette-common-white)',
            fontSize: '14px',
          },
          '& ::placeholder': {
            color: 'white !important',
            opacity: 1,
          },
          // },
          //   '& .Mui-focused': (theme) =>
          //     theme.applyStyles('light', {
          //       backgroundColor: 'var(--mui-palette-common-white)',
          //       color: 'var(--mui-palette-text-primary)',
          //     }),
          '& .Mui-focused': {
            bgcolor: 'background.paper',
            '& ::placeholder': {
              color: 'grey !important',
              // opacity: 0.75,
            },
          },
        }}
        slotProps={{
          input: {
            sx: {
              //  typography: 'caption',
              // backgroundColor: 'var(--mui-palette-background-default)',
              // color: 'currentColor',
              // '&::placeholder': {
              //   color: 'white',
              //   opacity: 1,
              // },
            },
            endAdornment: <SearchIcon />,
          },
          // inputLabel: {
          //   sx: {
          //     typography: 'caption',
          //   },
          // },
          // formHelperText: {
          //   sx: {
          //     typography: 'caption',
          //     opacity: 1,
          //   },
          // },
        }}
      />

      <Tooltip title="open search anywhere ERP wide">
        <IconButton
          sx={{
            display: { xs: mobileSearchMode ? 'none' : 'inline', md: 'none' },
          }}
          onClick={() => {
            setMobileSearchMode(!mobileSearchMode);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>

      <TextField
        variant="standard"
        type="search"
        placeholder="Search"
        size="small"
        margin="dense"
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <IconButton
                onClick={() => {
                  setMobileSearchMode(!mobileSearchMode);
                }}
              >
                <ArrowBackRoundedIcon />
              </IconButton>
            ),
            endAdornment: (
              <IconButton>
                <SearchIcon></SearchIcon>
              </IconButton>
            ),
          },
        }}
        sx={{
          //   '& .MuiInput-root': (theme) =>
          //     theme.applyStyles('light', {
          //       backgroundColor: 'var(--mui-palette-common-white)',
          //       color: 'var(--mui-palette-text-primary)',
          //     }),
          display: mobileSearchMode ? 'inline' : 'none',
          bgcolor: 'background.paper',
          // '& ::placeholder': {
          //   opacity: 0.75,
          // },
          fontSize: '14px',
        }}
      ></TextField>
    </>
  );
}
