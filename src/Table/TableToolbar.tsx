import React, { FC } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';

interface Props {
  selected: string[];
  Actions?: React.FC<{ selectedIds: string[] }>;
  NoSelectionToolbar?: React.FC;
  countText?: string;
}

const StyledTitle = styled(Typography)({
  flex: '1 1 100%',
  display: 'flex',
  alignItems: 'center',
});

const TableToolbar: FC<Props> = ({
  selected,
  Actions,
  NoSelectionToolbar,
  countText,
}) => {
  const numSelected = selected.length;
  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    ...(numSelected > 0 && {
      background: theme.palette.primary.main,
      color: 'white',
    }),
  }));

  if (numSelected > 0) {
    return (
      <StyledToolbar>
        <StyledTitle color='inherit' variant='subtitle1' component='div'>
          {countText ?? `${numSelected} selected`}
        </StyledTitle>
        {Actions?.({ selectedIds: selected })}
      </StyledToolbar>
    );
  }

  if (NoSelectionToolbar) {
    // eslint-disable-next-line no-unused-expressions
    return NoSelectionToolbar?.({});
  }

  return null;
};

export default TableToolbar;
