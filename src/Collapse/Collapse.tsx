import React, { FC, ReactElement, useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { COLLAPSE_MIN_HEIGHT } from '../constants';

import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

type CollapseProps = {
  title: string;
  content: ReactElement;
  className?: string;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      ':not(:last-child)': {
        borderBottom: 0,
      },
      ':before': {
        display: 'none',
      },
      $expanded: {
        margin: 'auto',
      },
    },
    expanded: {},
    rootAccordionSummary: {
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
    expandedAccordionSummary: {},
  }),
);

const Collapse: FC<CollapseProps> = ({ title, content }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const classes = useStyles();

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
          '&$expanded': {
            margin: 'auto',
          },
        },
      ]}
      classes={{
        root: classes.root,
        expanded: classes.expanded,
      }}
      expanded={expanded}
      onChange={handleChange(expanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{
          root: classes.rootAccordionSummary,
          expanded: classes.expandedAccordionSummary,
        }}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{content}</AccordionDetails>
    </Accordion>
  );
};

export default Collapse;
