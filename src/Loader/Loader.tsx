import {
  CircularProgress,
  CircularProgressProps,
  SxProps,
} from '@mui/material';

export type LoaderProps = {
  color?: CircularProgressProps['color'];
  sx?: SxProps;
};

export const Loader = ({ sx, color = 'primary' }: LoaderProps): JSX.Element => (
  <CircularProgress sx={sx} color={color} />
);

export default Loader;
