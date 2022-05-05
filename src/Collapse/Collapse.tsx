import React, { FC, ReactElement, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type CollapseProps = {
  title: string;
  content: ReactElement;
  className?: string;
};

const useStyles = makeStyles(() =>
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
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      flexDirection: 'row-reverse',
      '&$expanded': {
        minHeight: 56,
      },
      '& .MuiIconButton-edgeEnd': {
        marginRight: '4px',
        marginLeft: '4px',
      },
    },
    contentAccordionSummary: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expandedAccordionSummary: {},
  }),
);

const Collapse: FC<CollapseProps> = ({ title, content }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const classes = useStyles();

  const handleChange = (expanded: boolean) => () => {
    setExpanded(expanded ? false : true);
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
          content: classes.contentAccordionSummary,
        }}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{content}</AccordionDetails>
    </Accordion>
  );
};

export default Collapse;