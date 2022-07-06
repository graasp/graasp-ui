import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

interface Props {
  selected: string[];
  Actions?: React.FC<{ selectedIds: string[] }>;
  NoSelectionToolbar?: React.FC;
  countText?: string;
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
    display: 'flex',
    alignItems: 'center',
  },
  highlight: {
    background: theme.palette.primary.main,
    color: 'white',
  },
}));

const TableToolbar: FC<Props> = ({
  selected,
  Actions,
  NoSelectionToolbar,
  countText,
}) => {
  const classes = useToolbarStyles();
  const numSelected = selected.length;

  if (numSelected > 0) {
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {countText ?? `${numSelected} selected`}
        </Typography>
        {Actions?.({ selectedIds: selected })}
      </Toolbar>
    );
  }

  if (NoSelectionToolbar) {
    // eslint-disable-next-line no-unused-expressions
    return NoSelectionToolbar?.({});
  }

  return null;
};

export default TableToolbar;
