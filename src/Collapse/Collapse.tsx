import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SxProps, styled } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import React, { FC, ReactElement, useState } from 'react';

import { COLLAPSE_MIN_HEIGHT } from '../constants';

export type CollapseProps = {
  children?: ReactElement;
  title: string;
  /**
   * @deprecated use children
   */
  content?: ReactElement;
  sx?: SxProps;
};

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

const Collapse: FC<CollapseProps> = ({ title, content, sx, children }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (expanded: boolean) => () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      square
      elevation={0}
      sx={[
        {
          border: '1px solid rgba(0, 0, 0, .125)',
          boxShadow: 'none',
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
        {
          $expanded: {
            margin: 'auto',
          },
        },
        // You cannot spread `sx` directly because `SxProps` (typeof sx) might not be an array.
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      expanded={expanded}
      onChange={handleChange(expanded)}
    >
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </StyledAccordionSummary>
      <AccordionDetails>{content ?? children}</AccordionDetails>
    </Accordion>
  );
};

export default Collapse;
