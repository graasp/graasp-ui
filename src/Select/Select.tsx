import { FormControl, InputLabel, SxProps } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select';

import React from 'react';

type Props<T> = {
  buildOptionId?: (v: T) => string;
  className?: string;
  disabled?: boolean;
  color?: MuiSelectProps['color'];
  defaultValue?: T;
  value?: T;
  displayEmpty?: MuiSelectProps['displayEmpty'];
  id?: string;
  label?: MuiSelectProps['label'];
  labelId?: MuiSelectProps['labelId'];
  onChange?: MuiSelectProps<T>['onChange'];
  sx?: SxProps;
  values: { value: T; text: string; disabled?: boolean }[];
  variant?: MuiSelectProps['variant'];
  size?: MuiSelectProps['size'];
};

function Select<T extends string | number | readonly string[] | undefined>({
  buildOptionId,
  className,
  color,
  disabled = false,
  defaultValue,
  displayEmpty,
  id,
  label,
  labelId,
  onChange,
  sx,
  values,
  variant,
  size,
  value,
}: Props<T>): JSX.Element {
  const showLabel = Boolean(labelId ?? label);
  return (
    <FormControl
      sx={{ mt: 1 }}
      size={size}
      data-testid='select-test-id'
      disabled={disabled || values.every(({ disabled }) => disabled)}
    >
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
        {...(value && { value })}
        sx={sx}
      >
        {values.map(({ value, text, disabled }) => (
          <MenuItem
            key={buildOptionId?.(value)}
            id={buildOptionId?.(value)}
            value={value}
            disabled={Boolean(disabled)}
          >
            {text}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}

export default Select;
