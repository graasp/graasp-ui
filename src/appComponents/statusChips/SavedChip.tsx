import BackupIcon from '@mui/icons-material/Backup';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

import { StatusChipProps } from './types';

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
