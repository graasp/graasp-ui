import { SearchIcon } from 'lucide-react';

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
  /**
   * Data props to send to umami tracking service
   */
  dataUmami?: {
    event: string;
    // send the page path name so we know where the search was used
    page: string;
  };
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
  dataUmami,
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
      sx={{ flex: 1, width: width ?? '100%', backgroundColor: 'white' }}
      placeholder={placeholder}
      size={size}
      inputProps={{ 'aria-label': ariaLabel }}
      // Umami data props
      data-umami-event={dataUmami?.event}
      data-umami-event-page={dataUmami?.page}
    />
  );
};

export default SearchInput;
