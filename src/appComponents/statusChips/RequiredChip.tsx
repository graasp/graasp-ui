import WarningIcon from '@mui/icons-material/WarningRounded';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

import { StatusChipProps } from './types';

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
