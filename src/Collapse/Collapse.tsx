import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SxProps, Typography, styled } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { FC, ReactElement, useState } from 'react';

const COLLAPSE_MIN_HEIGHT = 56;

export type CollapseProps = {
  children?: ReactElement;
  title: string;
  /**
   * @deprecated use children
   */
  content?: ReactElement;
  sx?: SxProps;
  onCollapse?: (c: boolean) => void;
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

const Collapse: FC<CollapseProps> = ({
  title,
  content,
  sx,
  children,
  onCollapse,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (expanded: boolean) => () => {
    setExpanded(!expanded);
    onCollapse?.(!expanded);
  };

  return (
    <Accordion
      square
      elevation={0}
      disableGutters
      sx={[
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
