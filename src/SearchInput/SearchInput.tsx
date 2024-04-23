import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField, type TextFieldProps } from '@mui/material';

import { ChangeEvent } from 'react';

export type Props = {
  ariaLabel?: string;
  inputBaseId?: string;
  onChange?: (event: ChangeEvent<{ value: string }>) => void;
  placeholder?: string;
  value?: string;
  width?: string | number;
  margin?: TextFieldProps['margin'];
  size?: TextFieldProps['size'];
};

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
}: Props): JSX.Element => {
  return (
    <TextField
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <SearchIcon aria-label='search' />
          </InputAdornment>
        ),
      }}
      margin={margin}
      id={inputBaseId}
      onChange={onChange}
      value={value}
      sx={{ ml: 1, flex: 1, width: width ?? '100%', backgroundColor: 'white' }}
      placeholder={placeholder}
      size={size}
      inputProps={{ 'aria-label': ariaLabel }}
    />
  );
};

export default SearchInput;
