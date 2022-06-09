import React, { FC } from 'react';
import { styled, SxProps, Typography } from '@mui/material';

interface Props {
  emptyMessage?: string;
  sx?: SxProps;
}

const EmptyText = styled(Typography)(({theme}) => ({
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
