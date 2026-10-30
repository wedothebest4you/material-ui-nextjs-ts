import { Controller, useFormContext } from 'react-hook-form';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

interface Props extends StandardTextFieldProps {
  name: string;
  options: readonly string[];
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
            {options.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    ></Controller>
  );
}
