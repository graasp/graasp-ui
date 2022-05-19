import React, { FC, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

interface Props {
  numSelected: number;
  selected: string[];
  renderActions?: (args: { selectedIds: string[] }) => ReactElement;
  NoSelectionToolbarComponent?: React.ReactElement;
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
  numSelected,
  selected,
  renderActions,
  NoSelectionToolbarComponent,
  countText,
}) => {
  const classes = useToolbarStyles();
  const actions = renderActions?.({ selectedIds: selected });

  return numSelected > 0 ? (
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

      {Boolean(numSelected > 0) ?? actions}
    </Toolbar>
  ) : (
    NoSelectionToolbarComponent ?? null
  );
};

export default TableToolbar;
