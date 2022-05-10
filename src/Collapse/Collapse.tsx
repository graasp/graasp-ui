import React, { FC, ReactElement, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { COLLAPSE_MIN_HEIGHT } from '../constants';

type CollapseProps = {
  title: string;
  content: ReactElement;
  className?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
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