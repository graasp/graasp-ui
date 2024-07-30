import { Backup as BackupIcon } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

const SavedChip = ({ label, tooltip, dataCy }) =>
  _jsx(Tooltip, {
    title: tooltip,
    children: _jsx(Chip, {
      icon: _jsx(BackupIcon, {}),
      label: label,
      variant: 'outlined',
      'data-cy': dataCy,
    }),
  });
export default SavedChip;
