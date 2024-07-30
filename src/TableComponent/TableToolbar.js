import { Toolbar, Typography, styled } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

// casting is needed to support the `component` prop
// see: https://mui.com/material-ui/guides/typescript/#complications-with-the-component-prop
const StyledTitle = styled(Typography)({
  flex: '1 1 100%',
  display: 'flex',
  alignItems: 'center',
});
const TableToolbar = ({
  selected,
  Actions,
  NoSelectionToolbar,
  countTextFunction,
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
    return _jsxs(StyledToolbar, {
      children: [
        _jsx(StyledTitle, {
          color: 'inherit',
          variant: 'subtitle1',
          children: countTextFunction?.(selected) ?? `${numSelected} selected`,
        }),
        Actions?.({ selectedIds: selected }),
      ],
    });
  }
  if (NoSelectionToolbar) {
    // eslint-disable-next-line no-unused-expressions
    return NoSelectionToolbar?.();
  }
  return null;
};
export default TableToolbar;
