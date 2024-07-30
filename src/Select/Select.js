import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

const Select = ({
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
}) => {
  const showLabel = Boolean(labelId ?? label);
  return _jsxs(FormControl, {
    sx: { mt: label ? 1 : 0 },
    size: size,
    'data-testid': 'select-test-id',
    disabled: disabled || values.every(({ disabled }) => disabled),
    children: [
      showLabel && _jsx(InputLabel, { id: labelId, children: label }),
      _jsx(MuiSelect, {
        labelId: labelId,
        label: label,
        defaultValue: defaultValue,
        onChange: onChange,
        renderValue: (v) =>
          values.find(({ value }) => value === v)?.text ?? label,
        displayEmpty: displayEmpty,
        className: className,
        color: color,
        variant: variant,
        id: id,
        ...(value && { value }),
        sx: sx,
        children: values.map(({ value, text, disabled }) =>
          _jsx(
            MenuItem,
            {
              id: buildOptionId?.(value),
              value: value,
              disabled: Boolean(disabled),
              children: text,
            },
            buildOptionId?.(value),
          ),
        ),
      }),
    ],
  });
};
export default Select;
