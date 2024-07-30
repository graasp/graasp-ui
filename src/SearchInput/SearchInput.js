import { SearchIcon } from 'lucide-react';

import { InputAdornment, TextField } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

// todo: create minified version for small screens
export const SearchInput = ({
  ariaLabel = 'search',
  inputBaseId,
  onChange,
  placeholder = 'Search…',
  value = '',
  width,
  margin,
  size,
}) => {
  return _jsx(TextField, {
    InputProps: {
      endAdornment: _jsx(InputAdornment, {
        position: 'end',
        children: _jsx(SearchIcon, { 'aria-label': 'search' }),
      }),
    },
    margin: margin,
    id: inputBaseId,
    onChange: onChange,
    value: value,
    sx: { flex: 1, width: width ?? '100%', backgroundColor: 'white' },
    placeholder: placeholder,
    size: size,
    inputProps: { 'aria-label': ariaLabel },
  });
};
export default SearchInput;
