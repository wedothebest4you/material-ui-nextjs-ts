import { Controller, useFormContext } from 'react-hook-form';
import Select,{SelectProps} from '@mui/material/Select';
import { ComponentProps } from 'react';

interface Props extends ComponentProps<>> {
  muiName: string;
}
export default function ControlledDropdown(props: Props) {
  // const { name, label, helperText, ...rest } = props;
  const { control } = useFormContext();
  return (
    // <Controller
    //   name={name}
    //   control={control}
    //   render={({ field, fieldState, formState }) => {
    //     const { error } = fieldState;
    //     const { value, onChange } = field;
    //     return (
    //       <TextField
    //         helperText={error ? error.message : helperText}
    //         error={!!error}
    //         onChange={onChange}
    //         value={value || ''}
    //         label={label}
    //         variant="standard"
    //         {...rest}
    //       ></TextField>
    //     );
    //   }}
    // ></Controller>
  );
}
