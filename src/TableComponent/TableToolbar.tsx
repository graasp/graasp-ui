import { styled } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import React from 'react';

interface Props {
  selected: string[];
  Actions?: ({ selectedIds }: { selectedIds: string[] }) => JSX.Element;
  NoSelectionToolbar?: () => JSX.Element;
  countTextFunction?: (selection: string[]) => string;
}

// casting is needed to support the `component` prop
// see: https://mui.com/material-ui/guides/typescript/#complications-with-the-component-prop
const StyledTitle = styled(Typography)({
  flex: '1 1 100%',
  display: 'flex',
  alignItems: 'center',
}) as typeof Typography;

const TableToolbar = ({
  selected,
  Actions,
  NoSelectionToolbar,
  countTextFunction,
}: Props): JSX.Element | null => {
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
        <StyledTitle color='inherit' variant='subtitle1'>
          {countTextFunction?.(selected) ?? `${numSelected} selected`}
        </StyledTitle>
        {Actions?.({ selectedIds: selected })}
      </StyledToolbar>
    );
  }

  if (NoSelectionToolbar) {
    // eslint-disable-next-line no-unused-expressions
    return NoSelectionToolbar?.();
  }

  return null;
};

export default TableToolbar;
