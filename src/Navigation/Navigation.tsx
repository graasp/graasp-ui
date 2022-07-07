import React, { MouseEventHandler } from 'react';
import {
  makeStyles,
  Menu,
  MenuItem,
  Typography,
  Button,
  PropTypes,
} from '@material-ui/core';
import { redirect, Context } from '@graasp/utils';
import ExploreIcon from '../icons/ExploreIcon';
import BuildIcon from '../icons/BuildIcon';
import AnalyzeIcon from '../icons/AnalyzeIcon';
import PlayIcon from '../icons/PlayIcon';
import { HostMap } from '../types';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  // todo: remove once analyze is not a material icon anymore
  analyzeIcon: {
    margin: theme.spacing(0, 1, 0, 0.5),
  },
  button: {
    textTransform: 'capitalize',
    fontSize: theme.typography.fontSize,
    color: 'white',
  },
  menuItem: {
    textTransform: 'capitalize',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '5px solid #fff',
    display: 'inline',
    marginLeft: theme.spacing(1),
  },
}));

interface ContextMenuItemProps {
  value: Context;
  disabled?: boolean;
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  value,
  disabled,
}) => {
  const classes = useStyles();
  switch (value) {
    case Context.BUILDER:
      return (
        <>
          <BuildIcon className={classes.icon} disabled={disabled} />
          {Context.BUILDER}
        </>
      );
    case Context.EXPLORER:
      return (
        <>
          <ExploreIcon className={classes.icon} disabled={disabled} />
          {Context.EXPLORER}
        </>
      );
    case Context.PLAYER:
      return (
        <>
          <PlayIcon className={classes.icon} disabled={disabled} />
          {Context.PLAYER}
        </>
      );
    case Context.ANALYZER:
      return (
        <>
          <AnalyzeIcon className={classes.analyzeIcon} disabled={disabled} />
          {Context.ANALYZER}
        </>
      );
    default:
      return null;
  }
};

interface NavigationProps {
  id?: string;
  currentValue: Context;
  hostMap: HostMap;
  buttonColor?: PropTypes.Color;
  buttonClassname?: string;
  triangleClassname?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  currentValue,
  hostMap = {},
  id,
  buttonColor = 'secondary',
  buttonClassname,
  triangleClassname,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleClick: MouseEventHandler = (event): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const onClick = (value: Context) => () => {
    let url = hostMap[value];
    if (!url) {
      url = '/';
    }
    redirect(url);
  };

  return (
    <>
      <Button
        id={id}
        aria-controls='navigation-menu'
        aria-haspopup='true'
        onClick={handleClick}
        className={clsx(buttonClassname, classes.button)}
        variant='outlined'
        color={buttonColor}
      >
        <Typography variant='h6' color='inherit'>
          {currentValue}
        </Typography>
        <div className={clsx(triangleClassname, classes.triangle)} />
      </Button>
      <Menu
        id='navigation-menu'
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          className={classes.menuItem}
          onClick={onClick(Context.BUILDER)}
          disabled={currentValue === Context.BUILDER}
        >
          <ContextMenuItem value={Context.BUILDER} />
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={onClick(Context.EXPLORER)}
          disabled={currentValue === Context.EXPLORER}
        >
          <ContextMenuItem value={Context.EXPLORER} />
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={onClick(Context.PLAYER)}
          disabled={currentValue === Context.PLAYER}
        >
          <ContextMenuItem value={Context.PLAYER} />
        </MenuItem>
        <MenuItem disabled className={classes.menuItem}>
          <ContextMenuItem value={Context.ANALYZER} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navigation;
