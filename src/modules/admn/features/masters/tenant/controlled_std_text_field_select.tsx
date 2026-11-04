import { Controller, useFormContext } from 'react-hook-form';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { IsStringReadArray, IsSelectOptionsRecord } from '@/src/shared/client';
import { ListSubheader, Typography } from '@mui/material';

type Records = Readonly<{
  data: ReadonlyArray<Record<'id', string> & Record<string, string | number>>;
  labels: ReadonlyArray<Record<string, string>>;
}>;

interface Props extends StandardTextFieldProps {
  name: string;
  options: readonly string[] | Records;
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

        function getOptionsJSX() {
          if (IsStringReadArray(options)) {
            return options.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ));
          }
          if (IsSelectOptionsRecord(options)) {
            return Array(
              options.labels.map((item) => (
                <ListSubheader
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: `50% 30% 10%`,
                  }}
                >
                  {Object.values(item).map((value) => (
                    <Typography>{value}</Typography>
                  ))}
                </ListSubheader>
              )),
              options.data.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: `50% 30% 10%`,
                  }}
                >
                  {Object.values(item).map((value) => (
                    <Typography>{value}</Typography>
                  ))}
                </MenuItem>
              )),
            );
          } else {
            throw new TypeError(
              'The options type should be an array of strings or objects',
            );
          }
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
            ;{getOptionsJSX()}
          </TextField>
        );
      }}
    ></Controller>
  );
}
