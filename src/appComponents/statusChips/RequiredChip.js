import { WarningRounded as WarningIcon } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

const RequiredChip = ({ label, tooltip, dataCy }) =>
  _jsx(Tooltip, {
    title: tooltip,
    children: _jsx(Chip, {
      color: 'warning',
      icon: _jsx(WarningIcon, {}),
      label: label,
      variant: 'outlined',
      'data-cy': dataCy,
    }),
  });
export default RequiredChip;
