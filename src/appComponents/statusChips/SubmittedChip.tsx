import { CheckCircleOutline as CheckCircleOutlineIcon } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';

import { StatusChipProps } from './types.js';

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
