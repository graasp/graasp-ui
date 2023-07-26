import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

import React, { ChangeEvent, FC } from 'react';

export type Props = {
  ariaLabel?: string;
  inputBaseId?: string;
  onChange?: (event: ChangeEvent<{ value: string }>) => void;
  placeholder?: string;
  value?: string;
  width?: string | number;
};

// todo: create minified version for small screens
export const SearchInput: FC<Props> = ({
  ariaLabel = 'search',
  inputBaseId,
  onChange,
  placeholder = 'Search…',
  value = '',
  width,
}) => {
  return (
    <Paper
      variant='outlined'
      component='form'
      sx={{
        display: 'flex',
        alignItems: 'center',
        maxWidth: width,
        minWidth: 0,
      }}
    >
      <InputBase
        id={inputBaseId}
        onChange={onChange}
        value={value}
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': ariaLabel }}
      />
      <SearchIcon sx={{ m: 1 }} aria-label='search' />
    </Paper>
  );
};

export default SearchInput;
