import { CheckCircleOutline as CheckCircleOutlineIcon } from '@mui/icons-material';
import { Chip, Tooltip } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

const SubmittedChip = ({ label, tooltip, dataCy }) =>
  _jsx(Tooltip, {
    title: tooltip,
    children: _jsx(Chip, {
      color: 'info',
      icon: _jsx(CheckCircleOutlineIcon, {}),
      label: label,
      variant: 'outlined',
      'data-cy': dataCy,
    }),
  });
export default SubmittedChip;
