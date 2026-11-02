import { Controller, useFormContext } from 'react-hook-form';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { IsStringReadArray, IsObjectArrayWithId } from '@/src/shared/client';
import { ListSubheader, Typography } from '@mui/material';

interface Props extends StandardTextFieldProps {
  name: string;
  options:
    | readonly string[]
    | readonly (Record<'id', string> & Record<string, string | number>)[];
}

export default function ControlledStdTextFieldSelect(props: Props) {
  const {
    name,
    label,
    helperText,
    onChange: customOnChange,
    options,
    ...rest
  } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const { error } = fieldState;
        const { value, onChange } = field;

        let optionsjsx: React.JSX.Element[];

        if (IsStringReadArray(options)) {
          optionsjsx = options.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ));
        } else if (IsObjectArrayWithId(options)) {
          optionsjsx = options.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              {/* {item.id} */}
              {Object.entries(item).map(([key, value]) => (
                <Typography>{value}</Typography>
              ))}
            </MenuItem>
          ));
        } else {
          throw new TypeError(
            'The options type should be an array of strings or objects',
          );
        }
        return (
          <TextField
            select
            helperText={error ? error.message : helperText}
            error={!!error}
            onChange={(event) => {
              onChange(event);
              customOnChange?.(event);
            }}
            value={value || ''}
            label={label}
            variant="standard"
            {...rest}
          >
            <ListSubheader
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography>Description</Typography>
              <Typography>User Limit</Typography>
              <Typography>Id</Typography>
            </ListSubheader>
            ;{optionsjsx}
          </TextField>
        );
      }}
    ></Controller>
  );
}
