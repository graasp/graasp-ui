import { ChevronDown } from 'lucide-react';

import { Typography, styled } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import { useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

const COLLAPSE_MIN_HEIGHT = 56;
const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  '.MuiAccordionSummary-root': {
    marginBottom: -1,
    minHeight: COLLAPSE_MIN_HEIGHT,
    flexDirection: 'row-reverse',
    '&$expanded': {
      minHeight: COLLAPSE_MIN_HEIGHT,
    },
    '& .MuiIconButton-edgeEnd': {
      marginRight: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
    },
  },
  '.Mui-expanded': {},
}));
const Collapse = ({ title, sx, children }) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (expanded) => () => {
    setExpanded(!expanded);
  };
  return _jsxs(Accordion, {
    square: true,
    elevation: 0,
    disableGutters: true,
    sx: [
      {
        outline: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        borderRadius: 2,
      },
      {
        '&:not(:last-child)': {
          borderBottom: 0,
        },
      },
      {
        '&:before': {
          display: 'none',
        },
      },
      // You cannot spread `sx` directly because `SxProps` (typeof sx) might not be an array.
      ...(Array.isArray(sx) ? sx : [sx]),
    ],
    expanded: expanded,
    onChange: handleChange(expanded),
    children: [
      _jsx(StyledAccordionSummary, {
        expandIcon: _jsx(ChevronDown, {}),
        children: _jsx(Typography, { children: title }),
      }),
      _jsx(AccordionDetails, { children: children }),
    ],
  });
};
export default Collapse;
