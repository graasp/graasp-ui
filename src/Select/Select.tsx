import { FormControl, InputLabel, SxProps } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select';

import React from 'react';

type Props<T> = {
  buildOptionId?: (v: T) => string;
  className?: string;
  color?: MuiSelectProps['color'];
  defaultValue?: T;
  displayEmpty?: MuiSelectProps['displayEmpty'];
  id?: string;
  label?: MuiSelectProps['label'];
  labelId?: MuiSelectProps['labelId'];
  onChange?: MuiSelectProps['onChange'];
  sx?: SxProps;
  values: { value: T; text: string }[];
  variant?: MuiSelectProps['variant'];
};

function Select<T extends string | number | readonly string[] | undefined>({
  buildOptionId,
  className,
  color,
  defaultValue,
  displayEmpty,
  id,
  label,
  labelId,
  onChange,
  sx,
  values,
  variant,
}: Props<T>) {
  const showLabel = Boolean(labelId ?? label);
  return (
    <FormControl sx={{ mt: 1 }}>
      {showLabel && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect
        labelId={labelId}
        label={label}
        defaultValue={defaultValue}
        onChange={onChange}
        renderValue={(v) =>
          values.find(({ value }) => value === v)?.text ?? label
        }
        displayEmpty={displayEmpty}
        className={className}
        color={color}
        variant={variant}
        id={id}
        sx={sx}
      >
        {values.map(({ value, text }) => (
          <MenuItem
            key={buildOptionId?.(value)}
            id={buildOptionId?.(value)}
            value={value}
          >
            {text}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

export default Select;
