import { WarningRounded as WarningIcon } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';

import { StatusChipProps } from './types.js';

const RequiredChip = ({
  label,
  tooltip,
  dataCy,
}: StatusChipProps): JSX.Element => (
  <Tooltip title={tooltip}>
    <Chip
      color='warning'
      icon={<WarningIcon />}
      label={label}
      variant='outlined'
      data-cy={dataCy}
    />
  </Tooltip>
);

export default RequiredChip;
