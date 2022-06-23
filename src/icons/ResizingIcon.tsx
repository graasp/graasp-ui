import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import {
  RESIZING_ICON_LEVEL_BACKGROUND_COLOR,
  RESIZING_ICON_LEVEL_BACKGROUND_COLOR_FOCUS,
} from '../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      backgroundColor: theme.palette.grey[RESIZING_ICON_LEVEL_BACKGROUND_COLOR],
      padding: theme.spacing(0.5),
      '&:hover': {
        backgroundColor:
          theme.palette.grey[RESIZING_ICON_LEVEL_BACKGROUND_COLOR_FOCUS],
        transition: 'all 0.3s ease-in-out',
      },
      '&:focus': {
        backgroundColor:
          theme.palette.grey[RESIZING_ICON_LEVEL_BACKGROUND_COLOR_FOCUS],
      },
    },
  }),
);

const ResizingIcon = () => {
  const classes = useStyles();

  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <UnfoldMoreIcon className={classes.icon} color='primary' />
    </Box>
  );
};

export default ResizingIcon;
