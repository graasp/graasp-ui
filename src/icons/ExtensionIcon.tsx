import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      backgroundColor: theme.palette.grey[300],
      fontSize: '24px',
      padding: '4px',
      '&:hover': {
        backgroundColor: theme.palette.grey[500],
        transition: 'all 0.3s ease-in-out',
      },
      '&:focus': {
        backgroundColor: theme.palette.grey[500],
      },
    },
  }),
);

const ExtensionIcon = () => {
  const classes = useStyles();

  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <UnfoldMoreIcon className={classes.icon} color='primary' />
    </Box>
  );
};

export default ExtensionIcon;
