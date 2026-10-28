import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<typeof TextField> {
  name: string;
}
export default function ControlledTextField(props: Props) {
  const { name, label, helperText, ...rest } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const { error } = fieldState;
        const { value, onChange } = field;
        return (
          <TextField
            helperText={error ? error.message : helperText}
            error={!!error}
            onChange={onChange}
            value={value || ''}
            label={label}
            variant="standard"
            {...rest}
          ></TextField>
        );
      }}
    ></Controller>
  );
}
