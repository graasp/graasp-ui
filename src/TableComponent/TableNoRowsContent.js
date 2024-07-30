import { Typography, styled } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

const EmptyText = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));
const NoRowsComponent = ({ emptyMessage, sx }) => {
  return _jsx(EmptyText, {
    align: 'center',
    sx: sx,
    children: emptyMessage ?? 'No rows to display',
  });
};
export default NoRowsComponent;
