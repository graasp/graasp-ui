import { Backup as BackupIcon } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';

import { StatusChipProps } from './types.js';

const SavedChip = ({
  label,
  tooltip,
  dataCy,
}: StatusChipProps): JSX.Element => (
  <Tooltip title={tooltip}>
    <Chip
      icon={<BackupIcon />}
      label={label}
      variant='outlined'
      data-cy={dataCy}
    />
  </Tooltip>
);

export default SavedChip;
