import { Button, Menu, MenuItem, Typography, styled } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

import React, { MouseEventHandler } from 'react';

import { Context, redirect } from '@graasp/sdk';

import AnalyticsIcon from '../icons/AnalyticsIcon';
import BuildIcon from '../icons/BuildIcon';
import LibraryIcon from '../icons/LibraryIcon';
import PlayIcon from '../icons/PlayIcon';
import { HostMap } from '../types';

const NavigationMenuButton = styled(Button)(({ theme }) => ({
  textTransform: 'capitalize',
  fontSize: theme.typography.fontSize,
}));

const DropDownIcon = styled('div')(({ theme, color }) => {
  let buttonColor = 'black';
  if (color) {
    buttonColor = theme.palette[color]?.main;
  }
  return {
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: `5px solid ${buttonColor}`,
    display: 'inline',
    marginLeft: theme.spacing(1),
  };
});

interface ContextMenuItemProps {
  value: Context;
  disabled?: boolean;
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ value }) => {
  const iconSX = { mr: 1 };
  switch (value) {
    case Context.BUILDER:
      return (
        <>
          <BuildIcon size={30} sx={iconSX} />
          {Context.BUILDER}
        </>
      );
    case Context.LIBRARY:
      return (
        <>
          <LibraryIcon size={30} sx={iconSX} />
          {Context.LIBRARY}
        </>
      );
    case Context.PLAYER:
      return (
        <>
          <PlayIcon size={30} sx={iconSX} />
          {Context.PLAYER}
        </>
      );
    case Context.ANALYTICS:
      return (
        <>
          <AnalyticsIcon size={30} sx={iconSX} />
          {Context.ANALYTICS}
        </>
      );
    default:
      return null;
  }
};

const StyledMenuItem = styled(MenuItem)({
  textTransform: 'capitalize',
});

export interface NavigationProps {
  /**
   * button's classname
   */
  buttonClassname?: string;
  /**
   * button's color based on MUI design
   */
  buttonColor?: ButtonProps['color'];
  /**
   * current context to set as default value
   */
  currentValue: Context;
  /**
   * map of hosts to define apps' urls
   */
  hostMap: HostMap;
  /**
   * id string
   */
  id?: string;
  /**
   * button's triangle's classname
   */
  triangleClassname?: string;
  itemId?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  currentValue,
  hostMap = {},
  id,
  buttonColor = 'secondary',
  itemId,
}) => {
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
    redirect(url, { openInNewTab: true, name: `${value} ${itemId}` });
  };

  return (
    <>
      <NavigationMenuButton
        id={id}
        aria-controls='navigation-menu'
        aria-haspopup='true'
        onClick={handleClick}
        variant='outlined'
        color={buttonColor}
      >
        <Typography variant='h6' color='inherit'>
          {currentValue}
        </Typography>
        <DropDownIcon color={buttonColor} />
      </NavigationMenuButton>
      <Menu
        id='navigation-menu'
        anchorEl={anchorEl}
        keepMounted
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
        <StyledMenuItem
          onClick={onClick(Context.BUILDER)}
          disabled={currentValue === Context.BUILDER}
        >
          <ContextMenuItem value={Context.BUILDER} />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={onClick(Context.LIBRARY)}
          disabled={currentValue === Context.LIBRARY}
        >
          <ContextMenuItem value={Context.LIBRARY} />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={onClick(Context.PLAYER)}
          disabled={currentValue === Context.PLAYER}
        >
          <ContextMenuItem value={Context.PLAYER} />
        </StyledMenuItem>
        <StyledMenuItem disabled>
          <ContextMenuItem value={Context.ANALYTICS} />
        </StyledMenuItem>
      </Menu>
    </>
  );
};

export default Navigation;
