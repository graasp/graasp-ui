import { Typography } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

const QuestionLabel = ({ typographyProps, children, width, dataCy }) =>
  _jsx(Typography, {
    ...typographyProps,
    sx: { ...typographyProps?.sx, mb: 1, width },
    variant: 'h6',
    'data-cy': dataCy,
    children: children,
  });
export default QuestionLabel;
