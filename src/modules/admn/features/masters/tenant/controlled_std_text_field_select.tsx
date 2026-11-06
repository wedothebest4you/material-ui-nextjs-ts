import { Controller, useFormContext } from 'react-hook-form';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { IsStringReadArray, IsSelectOptionsRecord } from '@/src/shared/client';
import { ListItemText, ListSubheader, Typography } from '@mui/material';

type Records = Readonly<{
  data: ReadonlyArray<Record<'id', string> & Record<string, string | number>>;
  labels: Readonly<Record<string, Record<'title' | 'width', string>>>;
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
            const gridColumnsWidth = Object.values(options.labels)
              .map((i) => i.width)
              .join(''.padStart(1));
            return Array(
              [
                <ListSubheader
                  key={1}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: gridColumnsWidth,
                  }}
                >
                  {Object.values(options.labels).map((item) => (
                    <Typography key={item.title}>{item.title}</Typography>
                  ))}
                </ListSubheader>,
              ],
              options.data.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.id}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: Object.keys(item)
                      .map((i) => options.labels[i].width)
                      .join(''.padStart(1)),
                  }}
                >
                  {Object.values(item).map((value) => (
                    <>
                      {' '}
                      <Typography key={value}>{value}</Typography>
                    </>
                  ))}
                </MenuItem>
              )),
            );
          } else {
            throw new TypeError(
              'The options type should be an array of strings or objects with the keys - data and labels. The values of data keys can be either string or number, and for labels, it must be an array of objects with keys title and width of string values.',
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
