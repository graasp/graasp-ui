import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles, Typography } from '@material-ui/core';

interface Props {
  emptyMessage?: string;
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  emptyText: {
    margin: theme.spacing(2, 0),
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  actionCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));

const NoRowsComponent: FC<Props> = ({ emptyMessage, className }) => {
  const classes = useStyles();
  return (
    <Typography align='center' className={clsx(classes.emptyText, className)}>
      {emptyMessage ?? 'No rows to display'}
    </Typography>
  );
};

export default NoRowsComponent;
