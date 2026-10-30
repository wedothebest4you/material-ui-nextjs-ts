import { Controller, useFormContext } from 'react-hook-form';
import TextField, {
  type StandardTextFieldProps,
} from '@mui/material/TextField';

interface Props extends StandardTextFieldProps {
  name: string;
}
export default function ControlledStdTextField(props: Props) {
  const { name, label, helperText, onChange: customOnChange, ...rest } = props;
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
            onChange={(event) => {
              onChange(event);
              customOnChange?.(event);
            }}
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
