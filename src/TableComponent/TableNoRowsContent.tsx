import { SxProps, Typography, styled } from '@mui/material';

import React, { FC } from 'react';

interface Props {
  emptyMessage?: string;
  sx?: SxProps;
}

const EmptyText = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const NoRowsComponent: FC<Props> = ({ emptyMessage, sx }) => {
  return (
    <EmptyText align='center' sx={sx}>
      {emptyMessage ?? 'No rows to display'}
    </EmptyText>
  );
};

export default NoRowsComponent;
