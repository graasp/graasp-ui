import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

import { StatusChipProps } from './types';

const SubmittedChip = ({
  label,
  tooltip,
  dataCy,
}: StatusChipProps): JSX.Element => (
  <Tooltip title={tooltip}>
    <Chip
      color='info'
      icon={<CheckCircleOutlineIcon />}
      label={label}
      variant='outlined'
      data-cy={dataCy}
    />
  </Tooltip>
);

export default SubmittedChip;
