import { SxProps, Typography, styled } from '@mui/material';

type Props = {
  emptyMessage?: string;
  sx?: SxProps;
};

const EmptyText = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const NoRowsComponent = ({ emptyMessage, sx }: Props): JSX.Element => {
  return (
    <EmptyText align='center' sx={sx}>
      {emptyMessage ?? 'No rows to display'}
    </EmptyText>
  );
};

export default NoRowsComponent;
