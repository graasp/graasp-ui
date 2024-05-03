import { Checkbox, Stack, TableCell, TableRow, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

import { MouseEventHandler } from 'react';

interface Props {
  selected: string[];
  actions?: JSX.Element;
  NoSelectionToolbar?: () => JSX.Element;
  countTextFunction?: (selection: string[]) => string;
  colSpan?: number;
  onCheckboxClick?: MouseEventHandler<HTMLButtonElement>;
}

const TableToolbar = ({
  selected,
  actions,
  NoSelectionToolbar,
  countTextFunction,
  colSpan = 1,
  onCheckboxClick,
}: Props): JSX.Element | null => {
  const theme = useTheme();
  const numSelected = selected.length;

  if (numSelected > 0) {
    return (
      <TableRow
        sx={{
          pl: 2,
          pr: 1,
          background: theme.palette.primary.main,
        }}
      >
        <TableCell colSpan={colSpan}>
          <Stack direction='row'>
            <Checkbox checked color='secondary' onClick={onCheckboxClick} />
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
              color='secondary'
              variant='subtitle1'
            >
              {countTextFunction?.(selected) ?? `${numSelected} selected`}
            </Typography>
            {actions}
          </Stack>
        </TableCell>
      </TableRow>
    );
  }

  if (NoSelectionToolbar) {
    // eslint-disable-next-line no-unused-expressions
    return NoSelectionToolbar?.();
  }

  return null;
};

export default TableToolbar;
